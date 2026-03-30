import React, { useEffect } from 'react';
import { X, Copy, Check } from 'lucide-react';

const PromptModal = ({ prompt, onClose, onCopy, copied }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  if (!prompt) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="prompt-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="prompt-modal-title" className="modal-title">{prompt.title}</h2>
          <div className="modal-actions">
            <button
              className="copy-btn copy-btn--modal"
              onClick={() => onCopy(prompt)}
              title="Copy prompt content"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
            <button className="modal-close" onClick={onClose} title="Close">
              <X size={20} />
            </button>
          </div>
        </div>
        <span className="modal-category">{prompt.category}</span>
        <div className="modal-body">
          <pre className="modal-prompt-content">{prompt.content}</pre>
        </div>
        <div className="modal-footer">
          <div className="modal-tags">
            {prompt.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptModal;
