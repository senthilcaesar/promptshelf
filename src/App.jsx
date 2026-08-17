import React, { useEffect, useMemo, useState } from 'react';
import MainLayout from './components/MainLayout';
import './styles/app.css';

// Sample data - in a real app this would come from an API or localStorage
const initialPrompts = [
  {
    id: 1,
    title: 'Dark Mode Toggle',
    content:
      'I have built a web app. I like the design but I think it would greatly benefit from a dark mode toggle. Can you please add one to the top right corner of the app? In the light mode I want to use the sun emoji and in the dark mode I want to use the moon emoji. The app will auto update as you make changes.',
    category: 'Design',
    tags: ['design', 'dark mode', 'toggle'],
  },
  {
    id: 2,
    title: 'GitHub Pages Deployment',
    content:
      'I have a React app that builds to the dist folder. I want to deploy it on GitHub Pages using GitHub Actions. What additional files (workflow files, configuration, etc.) are required to enable automatic deployment?',
    category: 'Coding',
    tags: ['react', 'github pages', 'github actions'],
  },
  {
    id: 3,
    title: 'English Improvement',
    content:
      'Please take my English sentences or speech and rewrite them to sound natural and conversational, like a native speaker. Keep the sentences simple and concise avoid long, complicated clauses while preserving my original meaning and tone. If there are multiple good ways to say something, provide two or three alternatives. Briefly explain any key changes or idiomatic choices.',
    category: 'Personal',
    tags: ['english', 'improvement', 'native speaker'],
  },
  {
    id: 4,
    title: 'Market Researcher',
    content: `You are a senior market research analyst specializing in the Computer Science and AI industry. Produce a structured research report covering the following areas:
1. Industry landscape
Summarize the current state of the software development and AI tooling market. Include notable shifts in investment, key players, and any market consolidation or disruption worth flagging.
2. Emerging trends in AI coding assistants and developer tools
Identify the top 5–7 trends shaping how software is being built. For each trend, briefly explain what it is, who is driving it, and why it matters.
3. Enterprise AI adoption
How are mid-to-large businesses integrating AI into their workflows? Where is adoption accelerating, and where is it stalling? Include examples where possible.
4. Career positioning in an AI-transformed job market
What skills, roles, and strategies are most valuable for software engineers and technical professionals navigating this shift? Be specific about what is declining in demand and what is rising.
Format the output with clear section headers and bullet points where appropriate. Flag any areas where the data is uncertain or rapidly evolving.`,
    category: 'Research',
    tags: ['market research', 'ai', 'software development'],
  },
  {
    id: 5,
    title: 'Learn TypeScript',
    content:
      'Act as a senior software developer. Show me how to write a simple TypeScript program that takes a list of numbers and returns the average. Please explain each part of the code and take it step by step, as I’m a college freshman student in an introductory programming course. In addition, explicitly explain how to handle potential errors and edge cases like an empty list or the input is null.',
    category: 'Coding',
    tags: ['typescript', 'programming', 'beginner'],
  },
  {
    id: 6,
    title: 'Tech Stack',
    content: `Please add a 'Tech Stack' button to the main Header/Navigation component of this project.

Requirements:

Placement: Place the button in the top navigation bar, ideally next to the theme toggle or user settings. It should blend in with the existing UI aesthetics (e.g., using a ghost, text, or outline variant).

Icon: Include a code-related icon (like <Code /> or </>) inside the button next to the 'Tech Stack' label.

Interactivity: When clicked, the button should open a centered Modal/Dialog component. The background behind the modal should be slightly dimmed or blurred to focus the user's attention.

Modal Styling: The modal should match the application's current theme (supporting both light and dark mode automatically). It should have rounded corners, a subtle drop shadow, and a close ('X') button in the top right.

Modal Content:
Header: Set the title to 'Project Tech Stack'.
Introductory Text: Add a short description at the top: 'This app is built using the following technologies:'.
List of Technologies: Display a stacked vertical layout. Each item in the list should represent a core technology used in this project.
List Item Layout: For each technology, display:
An appropriate icon or logo on the left (with a subtle colored background box or tint if possible).
The name of the technology in a bold font.
A brief, one-sentence description of what that technology handles in the app (e.g., 'Fast, modern, component-driven UI framework').
Implementation: Please dynamically read the project's dependency file (like package.json) to accurately list the primary frontend framework, CSS/UI library, animation library, and any hosting/deployment pipelines currently configured. Build this using the UI components and icons already available in the project.`,
    category: 'Design',
    tags: ['tech stack', 'dependencies', 'deployment'],
  },
  {
    id: 7,
    title: 'AI Photography Scenarios',
    content: `Reference the attached picture and generate photo based on the following scenarios
1) Teaching in front of a whiteboard with AI diagram 
2) Working on a laptop in a coffee shop
3) Leading a workshop with students in the background
4) Recording a video tutorial at his desk
Keep his facial features and overall appearance identical across all 4 images`,
    category: 'Design',
    tags: ['photography', 'scenarios', 'image generation'],
  },
  {
    id: 8,
    title: 'Prompt Formatter Instructions',
    content: `## Instructions

You are a prompt formatter. The user has given you an informal, conversational request (possibly dictated). Your job is to produce a clean, well-structured prompt they can use anywhere — Claude Code, Claude.ai, ChatGPT, or other tools.

1. **Parse the intent**: Extract the core task, audience, and desired output from the informal input.

2. **Calibrate depth** using the heuristic in formatting-core.md:
   - **Light** (default): Format only. No depth injection.
   - **Standard**: Format + append assumptions/rationale block.
   - **Deep**: Format + append research/compare/verify block.
   - User can override with \`depth:light\`, \`depth:standard\`, or \`depth:deep\`.

3. **Format into a structured prompt** using the formatting elements in formatting-core.md. Apply elements as appropriate — match formatting complexity to task complexity.

4. **Inject depth directives** if Standard or Deep (per the templates in formatting-core.md). For Light, skip this step entirely.

5. **Output the formatted prompt** in a clean fenced code block.

6. **Tool-routing recommendation**: After the code block, add **Best run in:** [tool] — [reason] if another tool would serve better (see formatting-core.md). If Claude Code is the best fit, omit this line.

7. **If the prompt looks reusable** (template, workflow, recurring task):
   - Add a version header: ## Prompt v1.0 — [short name]
   - Suggest 3-5 eval test cases: brief input/expected-output pairs to verify quality

8. **If the prompt has agent/workflow context** (system instructions vs. user turn):
   - Separate into **System Prompt** and **User Prompt** sections within the code block

9. **Do NOT execute the prompt.** Output only.

## Important
- Do NOT over-engineer simple requests. Match formatting complexity to task complexity.
- Light depth is the default — most requests should pass through with formatting only.
- For one-off prompts, skip the version header and eval cases.
- Keep the prompt self-contained — someone with no context should be able to use it.`,
    category: 'Research',
    tags: ['prompt', 'formatting', 'instructions', 'standardization'],
  },
  {
    id: 9,
    title: 'Prompt Engineering Assistant',
    content: `# Prompt Engineering Assistant — Project Instructions

## Purpose
You are a prompt engineering assistant. Your job is to take narrative, unstructured input and restructure it into clean, well-organized prompts.

Primary deliverable: a ready-to-paste prompt (or small set of prompt variants) that reliably produces the user's desired output.

## Default behavior
- Rewrite messy specs into a structured prompt using standard sections (Role, Task, Context, Constraints, Output Format, Examples).
- Put instructions before context/data. Use clear delimiters between instructions and any quoted input.
- Make implicit requirements explicit. Remove filler while preserving meaning.
- Prefer action verbs and testable requirements over adjectives.
- If something important is missing: proceed with reasonable defaults and list them as "Assumptions," or ask a single clarifying question only if the missing info would likely change the output substantially.

## Output you produce each time
1. Final Prompt (ready to paste)
2. Suggestions (optional) — improvements, risks, missing info
   - Skipped when the user says "quick format"

## Supported modes
- "quick format" — output only the restructured prompt, no suggestions
- "format and critique" — restructured prompt plus detailed critique and 2-3 alternative prompt designs
- "prompt pack" — 2-4 prompt variants (minimal, standard, rigorous)

## Standard prompt structure
Use these headings in order (omit irrelevant sections):

### Role
Include only when starting a new thread or when specialized expertise changes outputs.

### Task
The single clearest description of what the model must do.

### Context
Background needed to perform the task well.

### Inputs
What the user is providing and how to treat it.

### Constraints
Rules, boundaries, and "do not" instructions. Include scope boundaries and what to do when uncertain.

### Output format
Exact structure, length targets, style/tone constraints, required elements.

### Examples
Only when examples exist or format is tricky.

### Acceptance criteria
A short checklist that makes success testable.

### Assumptions
Only include if you proceeded without asking a clarifying question.

## Quality checklist before finalizing
- Single main task is unambiguous
- Output format is explicit and easy to grade
- Constraints are not contradictory
- Data is clearly separated from instructions
- Any defaults are documented as assumptions
- Prompt is copy-pasteable and does not depend on hidden context`,
    category: 'Research',
    tags: ['prompt engineering', 'assistant', 'instructions', 'restructuring'],
  },
  {
    id: 10,
    title: 'AI Coding Teacher Interview',
    content: `I want to build a website for teaching people how to code using AI tools and AI coding assistants. I have a rough idea but haven't made any firm decisions yet.
Interview me using the question tool to help me think through the hard parts of building this. Focus on:

What makes this different from existing platforms (the angle or unique value)
How the learning experience actually works (structure, progression, feedback)
Technical decisions that will be hard to change later
Edge cases around different types of learners and skill levels
Anything I might be assuming that could turn out to be wrong

Skip anything straightforward — I want you to push on the decisions that have real tradeoffs or that people commonly get wrong. Ask one or two questions at a time so it feels like a conversation, not a form.
Once you feel we've covered the important ground, do a quick summary of what we've agreed on and flag anything still unresolved. Then write a full product spec to SPEC.md with these sections: Overview, Target Users, Core Features, Technical Approach, Open Questions.`,
    category: 'Coding',
    tags: ['spec', 'interview', 'ui/ux', 'technical implementation'],
  },
  {
    id: 11,
    title: 'Email Validator',
    content:
      'Implement a function in Python that validates email addresses. Write a validateEmail function. example test cases: user@example.com is true, invalid is false, user@.com is false. Run the tests after implementing it',
    category: 'Coding',
    tags: ['python', 'regex', 'validation', 'testing'],
  },
  {
    id: 12,
    title: 'Claude Brand Guidelines',
    content:
      "Restyle this web app's landing page to match Anthropic's visual identity. Use Anthropic's official brand guidelines colors, typography, and spacing. Preserve all existing functionality and layout structure — only change the visual styling.",
    category: 'Coding',
    tags: ['claude', 'UI', 'branding', 'skill'],
  },
  {
    id: 13,
    title: 'Supadata Transcript Summary',
    content:
      'Use the Supadata MCP server to pull the transcript for this YouTube video: [URL]. Then write a detailed summary of the main points discussed, organized as bullet points grouped by topic. Include key takeaways at the end.',
    category: 'Coding',
    tags: ['Supadata', 'AI', 'transcript', 'summary', 'skill'],
  },
  {
    id: 14,
    title: 'Blog Post Formatter',
    content:
      'Please format the following attached content as a blog post. Preserve the original wording exactly — do not rewrite, paraphrase, or add new sentences. You may add a title, section headings, and light formatting (bold, line breaks) to improve readability, but the body text must remain unchanged.',
    category: 'Coding',
    tags: ['Writing', 'AI', 'blogpost', 'formatting', 'skill'],
  },
  {
    id: 15,
    title: 'Modern AI Engineering Stack',
    content: `Please research and recommend current industry best practices for building a modern production-grade AI system.

Provide concise recommendations for each area:

- Frontend
- Backend
- AI orchestration
- LLMs
- Vector DB
- Infrastructure
- Monitoring
- Evaluation
- Observability

For each category, include:
1. Recommended tools/frameworks (current market standard)
2. Why they are commonly chosen
3. Best option for startups / mid-size teams
4. Best option for enterprise scale
5. Suggested reference architecture for 2026

Please prioritise practical, widely adopted solutions over hype.`,
    category: 'Research',
    tags: ['ai', 'architecture', 'best practices', 'infrastructure'],
  },
  {
    id: 16,
    title: 'Catppuccin Frappé',
    content:
      'Apply the Catppuccin Frappé dark theme to this UI. Refer to the official color palette at https://catppuccin.com/palette/ for all hex values - do not approximate or substitute colors.',
    category: 'design',
    tags: ['design', 'catppuccin', 'theme', 'frappe'],
  },
  {
    id: 17,
    title: 'Contextual Knowledge',
    content: `I would like to evolve the current project into a knowledge-driven testing platform where all historical execution data becomes reusable context for future AI agents.

Can you please recommend an architecture that allows agents to store, retrieve, reason over, and reuse knowledge from previous test runs?

The system should support storing and analyzing:

- Test run metadata
- Generated test specifications
- Crawl results
- Planner outputs
- Generated tests
- Screenshots
- Execution logs
- Healing/fix history
- Validation reports
- Test coverage information
- User feedback and approvals
- Final test artifacts

The goal is for future agents to:

- Load historical context during URL exploration
- Analyze previous test runs before generating new tests
- Detect existing test coverage
- Reuse existing modules and patterns
- Merge new tests intelligently into existing suites
- Avoid duplicate test generation
- Learn from healed/fixed tests
- Identify successful testing strategies
- Build progressively richer knowledge over time

Please evaluate and compare architectures such as:

- RAG (Retrieval-Augmented Generation)
- Agent Memory Systems
- LLM Wiki / Knowledge Base approaches
- Vector Databases
- Knowledge Graphs (Neo4j)
- Hybrid Memory Architectures
- Long-term vs Short-term Agent Memory
- Event-Sourced Architectures
- Knowledge Layer + Execution Layer separation

For each approach explain:
- Pros
- Cons
- Scalability
- Complexity
- Retrieval quality
- Agent reasoning capabilities
- Operational overhead

Please recommend:

- The best-fit architecture for our existing project
- A phased implementation roadmap
- Data model/schema recommendations
- Storage architecture
- Indexing strategy
- Retrieval strategy
- Agent memory strategy
- Knowledge ingestion workflows
- Knowledge update workflows
- Context assembly workflows
- How planner/generator/healer agents would consume knowledge
- How new execution data becomes part of the knowledge system

Please also propose:
- Folder structure
- Service architecture
- Knowledge APIs
- Memory management patterns
- Observability and governance considerations

The recommendation should prioritize:
- Seamless integration into the existing project
- Incremental adoption
- Reusability of historical testing knowledge
- Strong agent reasoning capabilities
- Long-term maintainability
- Support for future multi-agent workflows`,
    category: 'Research',
    tags: ['context', 'architecture', 'agent memory', 'rag', 'knowledge graph'],
  },
  {
    id: 18,
    title: 'Langfuse Tracing',
    content:
      'Install the Langfuse AI skill from github.com/langfuse/skills and use it to add tracing to this application with Langfuse following best practices.',
    category: 'Coding',
    tags: ['langfuse', 'tracing', 'integration', 'observability'],
  },
  {
    id: 19,
    title: 'Firebase Setup with MCP',
    content: `Using the Firebase MCP server, set up Firebase Firestore and Google Authentication for my project. Please perform the following steps:

Initialize/Switch Project: Update the Firebase MCP environment to point to my local project directory and set the active Firebase project ID.

Create Database: Use the firestore_create_database tool to provision the default Firestore database. (If it fails due to GCP billing restrictions, instruct me to create it manually).

Register Web App: Register a Web App for the web platform and retrieve its SDK config credentials.

Configure Services: Use firebase_init to enable Google Sign-In and Cloud Firestore, generating/updating the local configurations.

Deploy Rules: Write secure Firestore rules (partitioning data under user-isolated subcollections, e.g. /users/{userId}/items/{itemId}) and deploy the rules and auth configs using firebase_deploy.

Domain Authorization: Advise me to add localhost to the Firebase console's Authorized Domains list.`,
    category: 'Coding',
    tags: ['firebase', 'firestore', 'auth', 'mcp', 'setup'],
  },
  {
    id: 20,
    title: 'Project Spec',
    content: `Technology Stack:

Core Framework & Build Tool: React (using Vite)
Styling: Vanilla CSS utilizing CSS Variables for theme switching.
Backend & Database: Firebase Client SDK (Google Authentication, Cloud Firestore database real-time sync).
Animations: Framer Motion (for modal animations and smooth grid-to-list layout transitions).
Icons: Lucide React.
Deployment Pipeline: GitHub Actions deploying automatically to GitHub Pages.

Create a single-page React application with a premium industrial typewriter-terminal aesthetic. Implement the following design system and components:

1. Theme & Typography:
   - Background: Ruled ledger notebook grid line repeating pattern.
   - Dark Theme (Default): Catppuccin Frappé palette (charcoal base, mauve accent, peach/green indicators).
   - Light Theme: Retro Cream Paper background (\`#ebe7da\`), terracotta red accent (\`#a93c30\`), matte olive indicators.
   - Fonts: Elegant Lora (serif) for headers, JetBrains Mono (monospace) for controls and metadata.

2. Core Layout & Navigation:
   - Navbar: Compact unified header containing theme toggles, status pills, and a "Tech Stack" action button.
   - Filter Panel: Terminal-style search prompt (\`$ SEARCH_QUERY:\`) with category buttons and a Grid/List view toggle.
   - Fluid Grid/List Cards: Industrial-style outline cards representing items. Enable smooth layout transitions (e.g., using Framer Motion \`layout\`) when toggling between Grid and List views.

3. Modals & Interactivity:
   - Form Modals: Backdrop-blurred modal with clean inputs (no placeholders) and wide action buttons (\`CANCEL\` vs. primary accent button).
   - Tech Stack Modal: Dynamically imports \`package.json\` to display dependencies alongside custom descriptions and colored icon boxes on the left.
   - Delete Workflow: A modal pop-up confirmation for deletions, paired with a temporary toast that features an interactive "UNDO" action.`,
    category: 'Coding',
    tags: ['react', 'design', 'catppuccin', 'typewriter', 'aesthetic'],
  },
  {
    id: 21,
    title: 'Chrome Extension Side Panel',
    content: `Build a Chrome Extension side panel companion for this React application based on the reference extension found at [PATH_TO_REFERENCE_EXTENSION].

Requirements:
1. Create a Manifest V3 extension in an \`extension/\` folder with \`manifest.json\`, \`background.js\` (opening panel on click), and a \`popup.html\`/\`popup.js\` loader.
2. The loader must iframe this web app and append parameters: \`?source=extension&layout=sidepanel&add_url=[CURRENT_TAB_URL]&add_title=[CURRENT_TAB_TITLE]\`.
3. Auto-update the iframe whenever the active browser tab switches or navigates.
4. Modify the React app's entry points to detect \`source=extension\`, add an \`.extension-mode\` class to the body, and directly open the "Add Link" modal pre-filled with the current tab's URL and title as the main sidebar view, even if the URL is already saved.
5. In the React pre-fill hook, wrap all state updates inside a \`setTimeout(() => { ... }, 0)\` callback to prevent React setState-in-effect cascading render lint errors.
6. Add layout-compacting CSS overrides under \`.extension-mode\` to optimize the app for a narrow 300px side panel (e.g. hiding desktop headers, custom players, and tags sidebar, and forcing the modal to fill 100% of the sidebar space).`,
    category: 'Coding',
    tags: ['chrome extension', 'plugin', 'side panel', 'manifest v3'],
  },
  {
    id: 22,
    title: 'Document Extraction',
    content: `Read the extraction strategies in the SKILL.md files under ~/.claude/skills/
(docx, pdf, pptx, xlsx) and compare them with the document extractors in
<PATH/TO/SCRIPT.py>. A/B test each recommended tool against my current code
using hard cases (empty table cells, merged cells, document order, speaker
notes, uncached formulas, scanned PDFs) — adopt a tool only where it clearly
wins, keeping my extractor as a graceful fallback so a missing binary never
breaks the pipeline. Add missing fallbacks like OCR and legacy-format
conversion, update CI dependencies, verify both primary and fallback paths
with content-level assertions, and report what you adopted vs kept and why.`,
    category: 'Coding',
    tags: ['document extraction', 'ab test', 'pdf', 'docx', 'xlsx', 'pptx'],
  },
  {
    id: 23,
    title: 'Git Commit Message Rules',
    content: `Write a Git commit message for my changes. Follow these exact rules:

1. Keep the first line (summary) to about 50 characters.
2. Capitalize the first letter of the summary and do not put a period at the end.
3. Use the imperative tense (e.g., "Fix bug" instead of "Fixed bug" or "Fixes bug").
4. If more detail is needed, leave exactly one blank line after the summary.
5. Wrap all lines in the body text at 72 characters.

Here are the changes:
[Insert your git diff or description here]`,
    category: 'Coding',
    tags: ['git', 'commit', 'rules', 'version control'],
  },
  {
    id: 24,
    title: 'Extract Design System',
    content: `Analyze the entire codebase and extract its complete UI/UX design system into a reusable Markdown document named \`design.md\`.

The document should serve as the single source of truth for future projects and should capture only the design language—not the business logic.

Include:

- Overall design philosophy and visual identity
- Color palette (light mode and dark mode), including semantic colors
- Sidebar design (background, active/inactive states, hover effects, borders, spacing)
- Typography (fonts, sizes, weights, line heights)
- Spacing and layout system (grid, margins, padding, container widths)
- Border radius, shadows, elevation, and transparency effects
- Icons and iconography guidelines
- Buttons (all variants, sizes, states)
- Forms (inputs, selects, checkboxes, switches, validation styles)
- Tables, cards, modals, dialogs, popovers, tooltips
- Navigation components (sidebar, top bar, breadcrumbs, tabs)
- Notifications, alerts, badges, and status indicators
- Loading states, skeletons, empty states, and error pages
- Charts and data visualization styling
- Animation and transition guidelines
- Responsive design rules and breakpoints
- Accessibility considerations (contrast, focus states, keyboard navigation)
- Reusable UI patterns and component composition
- Tailwind CSS conventions (or other styling framework), including custom theme tokens
- CSS variables/design tokens and how they map to components
- Common design patterns that should be preserved in future projects
- Any reusable utility classes or helper functions related to styling

For every section:
1. Explain the design decision.
2. Reference the relevant files/components where the implementation exists.
3. Extract concrete values (colors, spacing, durations, radii, etc.) instead of giving generic advice.
4. Include code snippets where helpful.
5. Note any inconsistencies or duplicate patterns that should be standardized.

Finally, produce a clean, well-structured \`design.md\` that can be copied into any new project and used as the project's design specification. The document should be implementation-oriented and detailed enough that another developer or AI agent can recreate the same visual style without referring back to the original Test-Suite codebase.`,
    category: 'Design',
    tags: ['design system', 'documentation', 'ui/ux', 'markdown'],
  },
  {
    id: 25,
    title: 'Apply Design System',
    content: `Your task is to design the project's UI by using the \`design.md\` document as the single source of truth.

Before making any changes:
1. Read and fully understand \`design.md\`.
2. Analyze the current codebase and identify where it deviates from the design system.
3. Create a plan for updating the UI while preserving all existing functionality and business logic.

Requirements:
- Follow \`design.md\` exactly for colors, typography, spacing, layout, component styling, animations, and design tokens.
- Do not introduce new design patterns unless they are required to complete the implementation or are explicitly recommended in \`design.md\`.
- Preserve all application behavior, APIs, routing, state management, and business logic. Only the presentation layer should change.
- Reuse existing components wherever possible. Refactor duplicated styles into reusable components or theme utilities.
- Ensure both Light Mode and Dark Mode fully match the design specification.
- Make the UI responsive and accessible according to the guidelines in \`design.md\`.
- Remove inconsistent styling and replace it with the standardized design system.
- Use existing design tokens, CSS variables, Tailwind theme values, or styling utilities defined in the project instead of hardcoding values.
- Keep the implementation clean, maintainable, and consistent across the entire application.

For each significant UI change:
- Briefly explain what was changed.
- Reference the relevant section of \`design.md\` that motivated the change.
- Mention the files/components that were modified.

When finished:
1. Verify that every major page and reusable component follows \`design.md\`.
2. List any areas that could not be updated and explain why.
3. Provide a summary of the UI improvements and any refactoring that was performed.

The objective is for the application to look and feel as though it was originally built using the design system defined in \`design.md\`, while preserving 100% of its existing functionality.`,
    category: 'Design',
    tags: ['design system', 'design.md', 'ui', 'refactoring'],
  },
  {
    id: 26,
    title: 'Streaming LLM Chat App',
    content: `Teach me how to build a production-ready streaming LLM chat application using FastAPI, Next.js, and the OpenAI API. Start from the project setup and explain every component in detail, including the overall architecture, API design, streaming responses (SSE or WebSockets), frontend integration, conversation history management, error handling, authentication, deployment, and best practices. Include complete code examples and explain the purpose of each file.

Guide me step by step as if we were building the application together. After each step, explain why we are doing it before moving on. Include complete code examples, common pitfalls, debugging tips, and best practices throughout the tutorial.`,
    category: 'Coding',
    tags: ['fastapi', 'nextjs', 'openai', 'streaming', 'llm', 'chat'],
  },
  {
    id: 27,
    title: 'Enterprise SaaS Data Dashboard',
    content: `Design a modern, clean, professional UI from scratch for an enterprise SaaS data dashboard. The overall design should feel cohesive, polished, minimal, and enterprise-grade, serving as a reusable foundation for future applications.

**Design System & Styling**
Create a consistent design system covering layout, typography, spacing, cards, buttons, forms, navigation, tables, data visualization, badges, and interactive states. Support both light and dark themes with responsive behavior across desktop, tablet, and mobile. Use a minimal, spacious visual hierarchy with subtle borders, shadows, and rounded components (e.g., 14px border radius for cards).

**Color Palette & Typography**
The base palette should feature a light gray background, white cards, a dark navy header, and teal UI accents. The data visualization palette must include distinct green, blue, orange, and purple hues. Use a clean, sans-serif system font. Ensure all data metrics use tabular numbers for proper vertical alignment.

**Layout & Component Architecture**
Structure the layout in a single column with a max-width container, following an "aggregate first, detail on demand" philosophy:
1. Header: A dark top header with a logo and user avatar.
2. Controls: A sticky filter bar with dropdown controls and active filter chips.
3. Summary Section: A dark, aurora-gradient hero card displaying a single large metric, positioned alongside a 2x2 grid of KPI tiles featuring percentage changes and mini sparklines.
4. Main Content: Rounded cards containing stacked column charts, ranked horizontal bar lists, and a dense heatmap with numbers in every cell.
5. Details: A bottom section featuring a tabbed data table with search and pagination.

**Interactions & Accessibility**
Keep interactions subtle and polished, with proper hover, focus, loading, empty, and error states. Follow accessibility best practices, including keyboard navigation, sufficient contrast, and clear focus states.`,
    category: 'Design',
    tags: ['design', 'dashboard', 'saas', 'enterprise', 'ui'],
  },
];

const categories = [
  { id: 'all', name: 'All Prompts', icon: '📚' },
  { id: 'coding', name: 'Coding', icon: '💻' },
  { id: 'research', name: 'Research', icon: '🔍' },
  { id: 'design', name: 'Design', icon: '🎨' },
  { id: 'career', name: 'Career', icon: '💼' },
  { id: 'personal', name: 'Personal', icon: '👤' },
];

function App() {
  const [prompts, setPrompts] = useState(initialPrompts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [theme, setTheme] = useState(() => {
    const savedTheme = window.localStorage.getItem('prompt-shelf-theme');
    return savedTheme || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('prompt-shelf-theme', theme);
  }, [theme]);

  // Filter prompts based on search term and category
  const filteredPrompts = useMemo(() => {
    return prompts.filter((prompt) => {
      const matchesSearch =
        searchTerm === '' ||
        prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      const matchesCategory =
        selectedCategory === 'all' ||
        prompt.category.toLowerCase() === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [prompts, searchTerm, selectedCategory]);

  // Get prompt counts by category
  const categoryCounts = useMemo(() => {
    const counts = {};
    prompts.forEach((prompt) => {
      const category = prompt.category.toLowerCase();
      counts[category] = (counts[category] || 0) + 1;
    });
    return counts;
  }, [prompts]);

  return (
    <MainLayout
      categories={categories}
      categoryCounts={categoryCounts}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      viewMode={viewMode}
      setViewMode={setViewMode}
      theme={theme}
      setTheme={setTheme}
      prompts={filteredPrompts}
    />
  );
}

export default App;
