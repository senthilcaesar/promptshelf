import React, { useEffect, useMemo, useState } from 'react';
import MainLayout from './components/MainLayout';
import './styles/app.css';

// Sample data - in a real app this would come from an API or localStorage
const initialPrompts = [
  {
    id: 1,
    title: "Creative Writing Assistant",
    content: "You are a creative writing assistant. Help me brainstorm compelling character arcs for a sci-fi novel set in a post-apocalyptic world.",
    category: "Creative",
    tags: ["writing", "brainstorming", "fiction"]
  },
  {
    id: 2,
    title: "Code Review Helper",
    content: "Review this Python code for best practices, potential bugs, and optimization opportunities:\n\ndef fibonacci(n):\n    if n <= 1:\n        return n\n    else:\n        return fibonacci(n-1) + fibonacci(n-2)",
    category: "Coding",
    tags: ["python", "optimization", "review"]
  },
  {
    id: 3,
    title: "Market Research Analyst",
    content: "Analyze the current trends in AI-powered productivity tools. Compare Notion, ClickUp, and Monday.com in terms of AI capabilities.",
    category: "Research",
    tags: ["analysis", "comparison", "trends"]
  },
  {
    id: 4,
    title: "UX Design Critic",
    content: "Evaluate this mobile app interface design. Consider usability, accessibility, and visual hierarchy. Provide specific recommendations for improvement.",
    category: "Design",
    tags: ["ux", "critique", "accessibility"]
  },
  {
    id: 5,
    title: "Career Transition Guide",
    content: "I'm transitioning from marketing to product management. What skills should I highlight in my resume and interviews?",
    category: "Career",
    tags: ["transition", "resume", "interview"]
  },
  {
    id: 6,
    title: "Language Learning Tutor",
    content: "Teach me Spanish verb conjugations in the present tense. Focus on irregular verbs that are commonly used in daily conversation.",
    category: "Personal",
    tags: ["spanish", "education", "verbs"]
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
    return savedTheme === 'dark' ? 'dark' : 'light';
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
