import { useState } from 'react';
import './Panel.css';

function AboutPanel() {
  const [section, setSection] = useState('what');

  const navItems = [
    { id: 'what', label: "what's oracle?" },
    { id: 'privacy', label: 'privacy' },
    { id: 'terms', label: 'terms of use' },
    { id: 'report', label: 'report an issue' },
  ];

  const handleNavClick = (id) => {
    if (id === 'report') {
      window.open(
        'https://github.com/OracleAlsanna/oracle-url-shortener/issues',
        '_blank',
        'noreferrer'
      );
    } else {
      setSection(id);
    }
  };

  return (
    <div className="panel-body panel-about">
      <nav className="about-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`about-nav-item${section === item.id && item.id !== 'report' ? ' active' : ''}`}
            onClick={() => handleNavClick(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <div className="about-content">
        {section === 'what' && (
          <p>
            oracle is a url shortener that maps long links to unique 4-character
            codes. no ads, no trackers, no nonsense. paste a link, get a code,
            share it anywhere.
          </p>
        )}
        {section === 'privacy' && (
          <p>
            oracle does not log or store any personal information. links are
            stored locally in a database on the host machine only.
          </p>
        )}
        {section === 'terms' && (
          <p>
            by using oracle you agree to use it responsibly. oracle is provided
            as-is with no warranties. <a href="#" className="about-link">terms of use</a>.
          </p>
        )}
      </div>
    </div>
  );
}

function DonatePanel() {
  return (
    <div className="panel-body">
      <p className="panel-text">
        oracle is free and open source. if you find it useful, consider
        supporting its development.
      </p>
      <a href="#" className="donate-btn">
        buy me a coffee
      </a>
    </div>
  );
}

function UpdatesPanel() {
  return (
    <div className="panel-body">
      <div className="update-entry">
        <span className="update-version">v1.0.0</span>
        <span className="update-sep">—</span>
        <span className="update-desc">
          initial release. url shortening with 4-character alphanumeric codes.
        </span>
      </div>
    </div>
  );
}

const TITLES = {
  about: 'about',
  donate: 'donate',
  updates: 'updates',
};

export default function Panel({ type, onClose }) {
  return (
    <div className={`panel-overlay${type ? ' panel-open' : ''}`}>
      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">{TITLES[type] || ''}</span>
          <button className="panel-close" onClick={onClose}>
            ×
          </button>
        </div>
        {type === 'about' && <AboutPanel />}
        {type === 'donate' && <DonatePanel />}
        {type === 'updates' && <UpdatesPanel />}
      </div>
    </div>
  );
}
