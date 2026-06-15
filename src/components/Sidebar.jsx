import './Sidebar.css';

function IconLink() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function IconHeart() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function IconStar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function IconInfo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

export default function Sidebar({ activePanel, onPanelToggle, onShortenClick }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">{'>>'}</div>

      <div className="sidebar-top">
        <button
          className="sidebar-btn"
          onClick={onShortenClick}
          title="shorten"
        >
          <span className="sidebar-icon"><IconLink /></span>
          <span className="sidebar-label">shorten</span>
        </button>
      </div>

      <div className="sidebar-bottom">
        <button
          className={`sidebar-btn${activePanel === 'donate' ? ' active' : ''}`}
          onClick={() => onPanelToggle('donate')}
          title="donate"
        >
          <span className="sidebar-icon"><IconHeart /></span>
          <span className="sidebar-label">donate</span>
        </button>
        <button
          className={`sidebar-btn${activePanel === 'updates' ? ' active' : ''}`}
          onClick={() => onPanelToggle('updates')}
          title="updates"
        >
          <span className="sidebar-icon"><IconStar /></span>
          <span className="sidebar-label">updates</span>
        </button>
        <button
          className={`sidebar-btn${activePanel === 'about' ? ' active' : ''}`}
          onClick={() => onPanelToggle('about')}
          title="about"
        >
          <span className="sidebar-icon"><IconInfo /></span>
          <span className="sidebar-label">about</span>
        </button>
      </div>
    </aside>
  );
}
