# Task: rebuild the home page (index.html) from the new wireframe

All questions are already answered. Do not ask me anything; follow this brief exactly.

## Rules

- Work on the current branch. Commit when done. Do not push. I will check the page and push myself.
- Edit `index.html`. Only add to `css/index.css` if a new section needs a style that does not exist yet. Do not change any other page, `css/global.css`, `js/include.js`, or anything in `partials/`.
- Keep all existing styling. The wireframe in `doc/` is black and white on purpose: it shows structure and text only, not the visual style. Build the new sections with the classes the site already uses (in `css/global.css` and `css/index.css`) for section headings, cards, buttons, labels, grids and spacing, so the page looks like the rest of the site. Keep the scroll-reveal attributes the current sections use.
- Keep the header and footer includes (`<div data-include="partials/header.html">` and `partials/footer.html`) as they are.
- Use the text below exactly. Do not add, shorten or reword anything.
- Find existing content by its text, not by line number.
- Heading order: one `<h1>` (my name), one `<h2>` per section, `<h3>` for items inside a section.
- Every link and button must be at least 44 px tall to tap.

## Reference files

- `doc/Main.dc.html`: desktop wireframe, 1280 px wide
- `doc/Phone.dc.html`: phone wireframe, 390 px wide

Open them in a browser to see the layout. Ignore the `<x-dc>`, `<helmet>` and `support.js` parts; they only belong to the wireframe tool.

## What to remove from the current index.html

Remove the HTML between the header include and the footer include. This is content only: do not delete or change any CSS. The new page replaces these old sections:
- the old hero ("Product designer", "Helping ideas become products", the lead paragraph)
- the "Selected work" strip
- the old list of project cards
- "What I do." (Practice / Services), "How I work", "About", "What I can help with." and "Let's talk"

## New page, top to bottom

### 1. Hero

- `<h1>`: Maryna Rak
- Under it, larger text: Senior product designer
- Paragraph: I design complex digital products end to end, from research to release, including AI features. I use AI tools in my own design work, and I designed and built an AI product. Eight years in product design.
- Smaller, grey paragraph, two lines: Open to full-time senior product design roles.<br>Also available as an independent consultant for design and build projects.
- Two buttons side by side (stacked full width on phones):
  - Primary: "Download CV", links to `Maryna_Rak_CV.pdf`
  - Secondary: "Contact", links to `#contact`

### 2. Work (`id="work"`)

`<h2>`: Work

Four project cards: two per row on desktop, one per row on phones. Each card has, in this order: image, small label, `<h3>` title, one paragraph, role line, and a "Read case study" link.

| Image | Label | Title | Paragraph | Role | Link |
|---|---|---|---|---|---|
| `images/project-help-center-1.png` | Shipped | Support contact flow | A guided flow that helps players solve an issue before they open a ticket. It reduced tickets routed to one topic by up to 24%, on a platform with 2M+ players a year. | Lead designer | `project-help-center.html` |
| `images/echo-app-1.png` | Echo · Own project | Content repurposing tool | Turns one long piece of content, such as a podcast episode or a video, into shorter posts for different platforms, written in the creator's own style. | Lead designer | `project-echo.html` |
| `images/project-pagecraft-1.png` | Pagecraft · Own project, live MVP | AI product page generator | Paste a product URL and it drafts a product page. Built in Lovable with Claude. | Lead designer and builder | `project-pagecraft.html` |
| `images/project-design-system-1.png` | Ink · Client work | Design system | Color and type tokens, components and usage guidelines, with a documentation site. | Lead designer | `project-design-system.html` |

Give each image a short `alt` that describes what it shows.

Below the cards, a text link: "All projects →", links to `projects.html`.

### 3. What I do (`id="what-i-do"`)

`<h2>`: What I do

Six items: three columns on desktop, two on tablet, one on phones. Each item is an `<h3>` and a paragraph.

1. End-to-end product design: From discovery and research to release, and the changes after release.
2. Research and testing: I test flows with users before they are built, and collect feedback after release.
3. Working with the team: I work with product managers, engineers, QA and production from the first sketch to release.
4. Complex flows and structure: Multi-step flows with edge cases, and navigation and information architecture for large platforms.
5. Design systems and accessibility: Reusable components and guidelines. WCAG rules for contrast, keyboard navigation and interaction states.
6. Prototyping and handoff: Prototypes in Figma that engineers can build from. I know HTML and CSS, so I can talk with engineers about how a design will be built.

Below the items, a text link: "Full experience →", links to `about.html`.

### 4. AI in my work (`id="ai"`)

`<h2>`: AI in my work

Five items in the same grid as section 3. Each item is an `<h3>` and a paragraph.

1. AI in a shipped product: In the support contact flow I designed where the AI answer sits, how the answer and its disclosure are shown, and the "was this helpful?" check. A dedicated team built the AI itself.
2. A shipped AI product: Pagecraft: paste a product URL and it writes a full product page. I designed it and built it in Lovable with Claude, using custom skills I wrote.
3. From research to a working build: Echo writes posts in a creator's own style. I took it from research to a working build with Claude Chat, Claude Design and Claude Code.
4. My own design skills: Custom Claude skills that run design-thinking steps: How Might We questions, concept ideas, and testing ideas against a persona. They powered the discovery for Marginalia.
5. Tools: Claude, ChatGPT, Figma AI and Lovable. AI speeds up research and variations. The design decisions stay mine.

No link under this section yet; the "How I use AI" page does not exist.

### 5. FAQ (`id="faq"`)

`<h2>`: FAQ

Seven questions, all visible (no accordion). Each is an `<h3>` question and a paragraph answer, with a thin line between items.

1. **What are you strongest at?** My strongest side is the ability to quickly understand and learn new products and areas. How did that happen? I learned design by myself, and it turned out to give me the ability to learn how to learn and connect the dots.
2. **What projects are you interested in?** I would like to work on projects that allow AI integration in different flows. I'm also very eager to build an AI agent. I have experience with an AI assistant, but I'm looking for an opportunity to get to the next level. I'm interested in complex projects like medical, financial or HR tools.
3. **Do you work alone or in a team?** Most of the time I work as the lead and solo designer on a project. I take care of the organizational side, such as timelines and priorities, and also the day-to-day technical work: creating mockups, conducting research and so on.
4. **How do you use AI?** I use AI in different stages of a project, from exploration to prototyping. I have also shipped a couple of pet projects, testing and improving my workflows. The tools I use the most are Claude and Lovable.
5. **Have you built a product with AI?** Yes, two. Pagecraft is a live MVP: paste a product URL and it writes a product page. I built it in Lovable with Claude and my own skills. Echo writes posts in a creator's own style; I took it from research to a working build with Claude Chat, Claude Design and Claude Code. My most ambitious one is still in progress: I'm working on a design system generator aligned with Figma.
6. **Do you code?** Not as a front-end developer. I know HTML and CSS, which helps me work with AI and sometimes fix design implementation issues quickly.
7. **Are you available for contract work and consulting?** Yes, remotely: contract design work inside your team, design audits and consultations. Email me about your project. ("Email me" links to `mailto:maryna.rak01@gmail.com`.)

No "All questions" link yet; the FAQ page does not exist.

### 6. Contact (`id="contact"`)

`<h2>`: Contact

Three buttons in a row (stacked full width on phones):
- Primary: "maryna.rak01@gmail.com", links to `mailto:maryna.rak01@gmail.com`
- Secondary: "LinkedIn", links to `https://www.linkedin.com/in/marynarak`, opens in a new tab
- Secondary: "Download CV", links to `Maryna_Rak_CV.pdf`

## Not part of this task

Leave these for later:
- the header menu (Projects · About · FAQ · Contact)
- the footer link to the business site
- the Projects, About, FAQ and case-study pages

## When you finish

1. Open `index.html` at 1440 px and 390 px wide. Check that every section is visible after scrolling to the bottom, and that nothing scrolls sideways.
2. Report:
   - the sections in the order they appear
   - every link and where it goes
   - which existing classes you reused, and any CSS you added
3. Confirm that the page no longer contains any of these: "Helping ideas become products", "Selected work", "How I work", "What I can help with", "Let's talk".
4. Commit with the message "Rebuild home page from new wireframe". Do not push.
