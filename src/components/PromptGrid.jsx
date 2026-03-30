import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import PromptModal from './PromptModal';

const PromptGrid = ({ prompts }) => {
  const [copiedId, setCopiedId] = useState(null);
  const [selectedPrompt, setSelectedPrompt] = useState(null);

  const handleCopy = async (e, prompt) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(prompt.content);
      setCopiedId(prompt.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleCardClick = (prompt) => {
    setSelectedPrompt(prompt);
  };

  const handleCloseModal = () => {
    setSelectedPrompt(null);
  };

  const handleModalCopy = async (prompt) => {
    try {
      await navigator.clipboard.writeText(prompt.content);
      setCopiedId(prompt.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <>
      <div className="prompt-grid">
        {prompts.map((prompt) => (
          <div
            key={prompt.id}
            className="prompt-card"
            role="button"
            tabIndex={0}
            onClick={() => handleCardClick(prompt)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCardClick(prompt);
              }
            }}
          >
            <div className="prompt-card-header">
              <h3 className="prompt-title">{prompt.title}</h3>
              <div className="prompt-card-actions">
                <span className="prompt-category">{prompt.category}</span>
                <button
                  className="copy-btn"
                  onClick={(e) => handleCopy(e, prompt)}
                  title="Copy prompt content"
                >
                  {copiedId === prompt.id ? (
                    <Check size={16} />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>
            </div>
            <div className="prompt-content">{prompt.content}</div>
            <div className="prompt-tags">
              {prompt.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedPrompt && (
        <PromptModal
          prompt={selectedPrompt}
          onClose={handleCloseModal}
          onCopy={handleModalCopy}
          copied={copiedId === selectedPrompt?.id}
        />
      )}
    </>
  );
};

export default PromptGrid;
