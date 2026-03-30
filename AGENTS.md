# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

Prompt Shelf is a React 19 + Vite 8 web app for storing, searching, and organizing AI prompts with an archival library aesthetic.

## Commands

```bash
# Development server (runs on http://localhost:3000)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Architecture

### Component Structure
- `src/App.jsx` - Root component with state management (prompts, search, category filter, view mode)
- `src/components/MainLayout.jsx` - CSS Grid layout orchestrating sidebar + main content
- `src/components/Sidebar.jsx` - Category navigation and search
- `src/components/PromptGrid.jsx` - Card-based view of prompts
- `src/components/PromptList.jsx` - Compact row-based view

### Design System
- `src/styles/theme.css` - CSS custom properties for colors, typography, spacing
- `src/styles/app.css` - Component styles and responsive breakpoints

Uses CSS variables for theming. The design follows the "Archival Interface" philosophy (see `prompt-shelf-philosophy.md`) with brand alignment to Anthropic visual identity:
- **Colors**: Dark `#141413`, Light `#faf9f5`, Mid Gray `#b0aea5`
- **Accents**: Orange `#d97757` (primary), Blue `#6a9bcc` (secondary), Green `#788c5d` (tertiary)
- **Fonts**: Poppins (headings), Lora (body), JetBrains Mono (code/prompt content)

### Data Model
Prompts have: `id`, `title`, `content`, `category`, `tags[]`. Currently uses local state in App.jsx with sample data.

## Key Patterns

- **State flow**: App.jsx manages all state, passed down via props to MainLayout → child components
- **Filtering**: Uses `useMemo` for derived filtered prompts based on search term and category
- **View switching**: Toggle between grid/list views with state in App.jsx

## Dependencies

- React 19 with react-dom
- lucide-react for icons
- Vite 8 with @vitejs/plugin-react