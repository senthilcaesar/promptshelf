import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import PromptModal from './PromptModal';

const PromptList = ({ prompts }) => {
  const [copiedId, setCopiedId] = useState(null);
  const [selectedPrompt, setSelectedPrompt] = useState(null);

  const copyPrompt = async (prompt) => {
    try {
      await navigator.clipboard.writeText(prompt.content);
      setCopiedId(prompt.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleCopy = async (e, prompt) => {
    e.stopPropagation();
    await copyPrompt(prompt);
  };

  const handleOpenPrompt = (prompt) => {
    setSelectedPrompt(prompt);
  };

  const handleCloseModal = () => {
    setSelectedPrompt(null);
  };

  return (
    <>
      <div className="prompt-list">
        {prompts.map((prompt) => (
          <div
            key={prompt.id}
            className="prompt-list-item"
            role="button"
            tabIndex={0}
            onClick={() => handleOpenPrompt(prompt)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleOpenPrompt(prompt);
              }
            }}
          >
            <div className="list-item-content">
              <h3 className="list-item-title">{prompt.title}</h3>
              <div className="list-item-preview">
                {prompt.content.substring(0, 100)}...
              </div>
            </div>
            <div className="list-item-meta">
              <span className="list-item-category">{prompt.category}</span>
              <div className="list-item-tags">
                {prompt.tags.slice(0, 2).map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
                {prompt.tags.length > 2 && (
                  <span className="tag">+{prompt.tags.length - 2}</span>
                )}
              </div>
              <button
                className="copy-btn copy-btn--list"
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
        ))}
      </div>

      {selectedPrompt && (
        <PromptModal
          prompt={selectedPrompt}
          onClose={handleCloseModal}
          onCopy={copyPrompt}
          copied={copiedId === selectedPrompt?.id}
        />
      )}
    </>
  );
};

export default PromptList;
