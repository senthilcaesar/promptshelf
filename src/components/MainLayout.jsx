import React, { useState } from 'react';
import Sidebar from './Sidebar';
import PromptGrid from './PromptGrid';
import PromptList from './PromptList';

const MainLayout = ({
  categories,
  categoryCounts,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  viewMode,
  setViewMode,
  theme,
  setTheme,
  prompts
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="main-layout">
      <Sidebar
        categories={categories}
        categoryCounts={categoryCounts}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      <main className="main-content">
        <div className="content-header">
          <h1 className="content-title">Prompt Shelf</h1>
          <div className="content-header-actions">
            <div className="prompt-count">{prompts.length} prompts</div>
            <button
              type="button"
              className="theme-toggle"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <span className="theme-toggle-icon" aria-hidden="true">
                {theme === 'light' ? '☀️' : '🌙'}
              </span>
            </button>
          </div>
        </div>

        <div className="view-toggle">
          <button
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            Grid View
          </button>
          <button
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            List View
          </button>
        </div>

        {prompts.length > 0 ? (
          viewMode === 'grid' ? (
            <PromptGrid prompts={prompts} />
          ) : (
            <PromptList prompts={prompts} />
          )
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <h2 className="empty-state-title">No prompts found</h2>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MainLayout;
