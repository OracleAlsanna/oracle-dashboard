import { useState } from 'react';
import './LinkForm.css';

function IconLink() {
  return (
    <svg
      className="input-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

export default function LinkForm({ onSubmit, inputRef }) {
  const [url, setUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed || submitting) return;
    setSubmitting(true);
    const success = await onSubmit(trimmed);
    setSubmitting(false);
    if (success) setUrl('');
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setUrl(text);
    } catch (_) {}
  };

  return (
    <form className="link-form" onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <IconLink />
        <input
          ref={inputRef}
          type="text"
          className="url-input"
          placeholder="paste the link here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={submitting}
          autoComplete="off"
          spellCheck={false}
        />
      </div>
      <div className="form-actions">
        <div className="actions-left">
          <button
            type="submit"
            className="pill-btn"
            disabled={submitting || !url.trim()}
          >
            {submitting ? 'shortening...' : 'shorten'}
          </button>
        </div>
        <div className="actions-right">
          <button type="button" className="pill-btn" onClick={handlePaste}>
            paste
          </button>
        </div>
      </div>
    </form>
  );
}
