import React, { useEffect, useMemo, useState } from 'react';
import MainLayout from './components/MainLayout';
import './styles/app.css';

// Sample data - in a real app this would come from an API or localStorage
const initialPrompts = [
  {
    id: 1,
    title: "Dark Mode Toggle",
    content: "I have built a web app. I like the design but I think it would greatly benefit from a dark mode toggle. Can you please add one to the top right corner of the app? In the light mode I want to use the sun emoji and in the dark mode I want to use the moon emoji. The app will auto update as you make changes.",
    category: "Design",
    tags: ["design", "dark mode", "toggle"]
  },
  {
    id: 2,
    title: "GitHub Pages Deployment",
    content: "I have a React app that builds to the dist folder. I want to deploy it on GitHub Pages using GitHub Actions. What additional files (workflow files, configuration, etc.) are required to enable automatic deployment?",
    category: "Coding",
    tags: ["react", "github pages", "github actions"]
  },
  {
    id: 3,
    title: "English Improvement",
    content: "Please take my English sentences or speech and rewrite them to sound natural and conversational, like a native speaker. Keep the sentences simple and concise avoid long, complicated clauses while preserving my original meaning and tone. If there are multiple good ways to say something, provide two or three alternatives. Briefly explain any key changes or idiomatic choices.",
    category: "Personal",
    tags: ["english", "improvement", "native speaker"]
  },
  {
    id: 4,
    title: "Market Researcher",
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
    category: "Research",
    tags: ["market research", "ai", "software development"]
  },
  {
    id: 5,
    title: "Learn TypeScript",
    content: "Act as a senior software developer. Show me how to write a simple TypeScript program that takes a list of numbers and returns the average. Please explain each part of the code and take it step by step, as I’m a college freshman student in an introductory programming course. In addition, explicitly explain how to handle potential errors and edge cases like an empty list or the input is null.",
    category: "Coding",
    tags: ["typescript", "programming", "beginner"]
  },
  {
    id: 6,
    title: "Tech Stack",
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
    category: "Design",
    tags: ["tech stack", "dependencies", "deployment"]
  },
  {
    id: 7,
    title: "AI Photography Scenarios",
    content: `Reference the attached picture and generate photo based on the following scenarios
1) Teaching in front of a whiteboard with AI diagram 
2) Working on a laptop in a coffee shop
3) Leading a workshop with students in the background
4) Recording a video tutorial at his desk
Keep his facial features and overall appearance identical across all 4 images`,
    category: "Design",
    tags: ["photography", "scenarios", "image generation"]
  },
  {
    id: 8,
    title: "Prompt Formatter Instructions",
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
    category: "Research",
    tags: ["prompt", "formatting", "instructions", "standardization"]
  },
  {
    id: 9,
    title: "Prompt Engineering Assistant",
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
    category: "Research",
    tags: ["prompt engineering", "assistant", "instructions", "restructuring"]
  },
  {
    id: 10,
    title: "AI Coding Teacher Interview",
    content: `I want to build a website for teaching people how to code using AI tools and AI coding assistants. I have a rough idea but haven't made any firm decisions yet.
Interview me using the question tool to help me think through the hard parts of building this. Focus on:

What makes this different from existing platforms (the angle or unique value)
How the learning experience actually works (structure, progression, feedback)
Technical decisions that will be hard to change later
Edge cases around different types of learners and skill levels
Anything I might be assuming that could turn out to be wrong

Skip anything straightforward — I want you to push on the decisions that have real tradeoffs or that people commonly get wrong. Ask one or two questions at a time so it feels like a conversation, not a form.
Once you feel we've covered the important ground, do a quick summary of what we've agreed on and flag anything still unresolved. Then write a full product spec to SPEC.md with these sections: Overview, Target Users, Core Features, Technical Approach, Open Questions.`,
    category: "Coding",
    tags: ["spec", "interview", "ui/ux", "technical implementation"]
  },
  {
    id: 11,
    title: "Email Validator",
    content: "Implement a function in Python that validates email addresses. Write a validateEmail function. example test cases: user@example.com is true, invalid is false, user@.com is false. Run the tests after implementing it",
    category: "Coding",
    tags: ["python", "regex", "validation", "testing"]
  }
];

const categories = [
  { id: 'all', name: 'All Prompts', icon: '📚' },
  { id: 'coding', name: 'Coding', icon: '💻' },
  { id: 'research', name: 'Research', icon: '🔍' },
  { id: 'design', name: 'Design', icon: '🎨' },
  { id: 'career', name: 'Career', icon: '💼' },
  { id: 'personal', name: 'Personal', icon: '👤' }
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
    return prompts.filter(prompt => {
      const matchesSearch = searchTerm === '' ||
        prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === 'all' ||
        prompt.category.toLowerCase() === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [prompts, searchTerm, selectedCategory]);

  // Get prompt counts by category
  const categoryCounts = useMemo(() => {
    const counts = {};
    prompts.forEach(prompt => {
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
