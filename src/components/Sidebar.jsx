import React from 'react';
import { Search, Menu, X } from 'lucide-react';

const Sidebar = ({
  categories,
  categoryCounts,
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  setSearchTerm,
  collapsed,
  setCollapsed
}) => {
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!collapsed && <h2 className="sidebar-title">Prompt Shelf</h2>}
        <button
          className="toggle-btn"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Menu size={20} />
        </button>
      </div>

      {!collapsed && (
        <>
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search prompts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="search-clear-btn"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <ul className="category-list">
            {categories.map((category) => (
              <li key={category.id} className="category-item">
                <button
                  className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className="category-icon">{category.icon}</span>
                  {category.name}
                  {category.id !== 'all' && (
                    <span className="category-count">
                      {categoryCounts[category.id] || 0}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </aside>
  );
};

export default Sidebar;