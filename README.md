# Prompt Shelf

A React 19 + Vite 8 web app for storing, searching, and organizing AI prompts with an archival library aesthetic.

## Features

- **Archival Design**: Sophisticated interface inspired by library science and archival systems
- **Category Organization**: Sort prompts by Coding, Research, Design, Career, and Personal
- **Real-time Search**: Instantly find prompts by title, content, or tags
- **Dual Views**: Toggle between grid view (card-based) and list view (compact rows)
- **Responsive Layout**: Works seamlessly on desktop and mobile devices

## Tech Stack

- React 19 with the `use` API for data and improved Transitions
- Vite 8 as the build tool
- Lucide React for icons
- Pure Vanilla CSS with CSS Grid for layout
- CSS Variables for the design system

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd promptshelf
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

To start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:3000

## Building for Production

To create a production build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

## Architecture

The application follows a clean component architecture:

- `App.jsx`: Main application component with state management
- `MainLayout.jsx`: Defines the CSS Grid layout for sidebar + main content
- `Sidebar.jsx`: Persistent navigation with category filtering
- `PromptGrid.jsx`: Card-based view of prompts
- `PromptList.jsx`: Compact row-based view of prompts

## Design System

The application uses the **Anthropic Brand Aligned** theme with:
- **Colors**: Anthropic brand palette (Dark `#141413`, Light `#faf9f5`, Mid Gray `#b0aea5`)
- **Accents**: Orange `#d97757` (primary), Blue `#6a9bcc` (secondary), Green `#788c5d` (tertiary)
- **Typography**: Poppins (headings), Lora (body), JetBrains Mono (code)
- CSS Grid for layout with sticky positioning
- Smooth transitions and hover states with brand-consistent styling

## License

MIT