(function(){
const cv=document.getElementById('gradient-canvas');
const gl=cv.getContext('webgl')||cv.getContext('experimental-webgl');
let W,H,DPR;
function resize(){DPR=Math.min(devicePixelRatio||1,2);const r=cv.getBoundingClientRect();
  W=cv.width=Math.max(1,r.width)*DPR;H=cv.height=Math.max(1,r.height)*DPR;
  gl.viewport(0,0,W,H);}
resize();addEventListener('resize',resize);

const vs=`attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;

// fragment shader: layered flowing noise -> smooth colour ribbons
const fs=`
precision highp float;
uniform vec2 res; uniform float t; uniform vec2 mouse; uniform float mAmt;

// hash + value noise
vec2 hash(vec2 p){p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));
  return -1.+2.*fract(sin(p)*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);
  return mix(mix(dot(hash(i+vec2(0,0)),f-vec2(0,0)),dot(hash(i+vec2(1,0)),f-vec2(1,0)),u.x),
             mix(dot(hash(i+vec2(0,1)),f-vec2(0,1)),dot(hash(i+vec2(1,1)),f-vec2(1,1)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<6;i++){v+=a*noise(p);p*=2.02;a*=.5;}return v;}

// palette: blue/indigo anchor blended with the warm peach/orange from v1
vec3 pal(float x){
  x=clamp(x,0.,1.);
  vec3 c1=vec3(0.32,0.40,0.91);  // indigo (site accent)
  vec3 c2=vec3(0.34,0.64,0.95);  // azure
  vec3 c3=vec3(0.60,0.62,0.97);  // periwinkle
  vec3 c4=vec3(0.92,0.64,0.86);  // pink-lilac
  vec3 c5=vec3(1.00,0.78,0.62);  // faint warm (just a touch)
  vec3 col=mix(c1,c2,smoothstep(0.0,0.26,x));
  col=mix(col,c3,smoothstep(0.24,0.48,x));
  col=mix(col,c4,smoothstep(0.48,0.74,x));
  col=mix(col,c5,smoothstep(0.84,1.0,x));
  return col;
}

void main(){
  vec2 uv=gl_FragCoord.xy/res.xy;
  vec2 p=uv; p.x*=res.x/res.y;
  float tt=t*0.045;

  // mouse influence: warp the field toward the cursor
  vec2 m=mouse; m.x*=res.x/res.y;
  vec2 toM=(m-p);
  float md=length(toM);
  vec2 warp=toM*mAmt*0.35*exp(-md*1.6);

  // domain-warped fbm -> flowing ribbons
  vec2 q=vec2(fbm(p*1.4+vec2(0.,tt)), fbm(p*1.4+vec2(5.2,-tt)));
  vec2 r=vec2(fbm(p*1.4+q*1.8+vec2(1.7,9.2)+warp+tt*0.5),
              fbm(p*1.4+q*1.8+vec2(8.3,2.8)-warp-tt*0.4));
  float f=fbm(p*1.5+r*2.4+warp*2.0);

  // shape it into silky bands
  float shade=0.5+0.5*f;
  shade+=0.18*sin((p.x+p.y)*2.2+r.x*4.0+tt*2.0); // extra flow streaks
  shade=clamp(shade,0.,1.);

  vec3 col=pal(shade);

  // COMPLEMENTARY: colour lives everywhere but carries most weight on the RIGHT.
  // Left/centre (where the headline sits) stays airy; right side blooms richer.
  float right = smoothstep(0.15, 0.95, uv.x);         // 0 at far left -> 1 at far right
  float top   = smoothstep(-0.2, 1.0, uv.y);          // a little more toward the top
  float weight = mix(0.28, 1.0, right) * (0.7 + 0.35*top);  // never fully empty on the left
  float body = length(r)*1.0 + f*0.55;
  float presence = clamp(weight * smoothstep(0.05,0.75,body+0.18), 0.0, 1.0) * 0.55; // darker/more visible

  col = mix(vec3(1.0,0.995,0.99), col, presence);

  // keep corners from going flat-white too hard, but stay light on the left
  float vig=smoothstep(1.3,0.4,length(uv-vec2(0.68,0.5)));
  col=mix(vec3(1.0,0.997,0.994),col,0.45+0.55*vig);

  gl_FragColor=vec4(col,1.);
}`;

function sh(type,src){const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);
  if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))console.error(gl.getShaderInfoLog(s));return s;}
const prog=gl.createProgram();
gl.attachShader(prog,sh(gl.VERTEX_SHADER,vs));
gl.attachShader(prog,sh(gl.FRAGMENT_SHADER,fs));
gl.linkProgram(prog);gl.useProgram(prog);

const buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
const loc=gl.getAttribLocation(prog,'p');gl.enableVertexAttribArray(loc);
gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);

const uRes=gl.getUniformLocation(prog,'res');
const uT=gl.getUniformLocation(prog,'t');
const uM=gl.getUniformLocation(prog,'mouse');
const uMA=gl.getUniformLocation(prog,'mAmt');

let mxT=0.5,myT=0.5,mx=0.5,my=0.5,maT=0,ma=0;
window.addEventListener('pointermove',e=>{const r=cv.getBoundingClientRect();
  mxT=(e.clientX-r.left)/r.width;
  myT=1.-(e.clientY-r.top)/r.height;
  maT=1.;});
window.addEventListener('pointerleave',()=>{maT=0.;});
addEventListener('resize',resize);

let t0=performance.now();
function frame(now){
  const t=(now-t0)/1000;
  mx+=(mxT-mx)*0.05; my+=(myT-my)*0.05; ma+=(maT-ma)*0.03;
  gl.uniform2f(uRes,W,H);
  gl.uniform1f(uT,t);
  gl.uniform2f(uM,mx,my);
  gl.uniform1f(uMA,ma);
  gl.drawArrays(gl.TRIANGLES,0,6);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
})();