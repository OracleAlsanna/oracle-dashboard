import { useState, useRef, useEffect } from 'react';
import AnalyticsPanel from './AnalyticsPanel.jsx';
import './BottomBar.css';

function IconGitHub() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
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

function IconChart() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function AboutPanel({ onClose, style, initialSection }) {
  const [section, setSection] = useState(initialSection || 'what');

  const navItems = [
    { id: 'what', label: "what's oracle?" },
    { id: 'privacy', label: 'privacy' },
    { id: 'terms', label: 'terms of use' },
    { id: 'report', label: 'report an issue' },
  ];

  const handleNav = (id) => {
    if (id === 'report') {
      window.open(
        'https://github.com/OracleAlsanna/oracle-dashboard/issues',
        '_blank',
        'noreferrer'
      );
    } else {
      setSection(id);
    }
  };

  return (
    <div className="popout-panel popout-wide" style={style}>
      <div className="popout-header">
        <span className="popout-title">about</span>
        <button className="popout-close" onClick={onClose}>×</button>
      </div>
      <div className="about-body">
        <nav className="about-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`about-nav-item${
                section === item.id && item.id !== 'report' ? ' active' : ''
              }`}
              onClick={() => handleNav(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="about-content">
          {section === 'what' && (
            <p>
              oracle is a url shortener that maps long links to unique
              4-character codes. no ads, no trackers, no nonsense. paste a
              link, get a code, share it anywhere.
            </p>
          )}
          {section === 'privacy' && (
            <p>
              oracle does not log or store any personal information. links are
              stored locally in a database on the host machine only.
            </p>
          )}
          {section === 'terms' && (
            <>
              <p>
                by using oracle you agree to use it responsibly. do not use
                oracle to shorten links to illegal content, malware, phishing
                pages, or anything intended to harm or deceive others.
              </p>
              <p>
                links pointing to local or private network addresses are
                rejected automatically. links may be password-protected or set
                to expire by their creator. oracle reserves the right to
                remove any link at its own discretion.
              </p>
              <p>
                oracle is provided as-is with no warranties of any kind,
                express or implied, including but not limited to uptime,
                accuracy, or fitness for a particular purpose.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function DonatePanel({ onClose, style }) {
  return (
    <div className="popout-panel" style={style}>
      <div className="popout-header">
        <span className="popout-title">donate</span>
        <button className="popout-close" onClick={onClose}>×</button>
      </div>
      <div className="popout-body">
        <p className="popout-text">
          oracle is free and open source. if you find it useful, consider
          supporting its development.
        </p>
        <a href="#" className="donate-btn">
          buy me a coffee
        </a>
      </div>
    </div>
  );
}

const CHANGELOG = [
  {
    version: 'v1.4.0',
    desc: 'link ownership: only the browser that created a link can delete it, via a one-time secret token.',
  },
  {
    version: 'v1.3.0',
    desc: 'custom short codes, link expiration, and password-protected links. qr codes now generate locally instead of calling a third-party api.',
  },
  {
    version: 'v1.2.0',
    desc: 'live analytics: a chart of top links by clicks and a recent-clicks feed, pulled from the backend.',
  },
  {
    version: 'v1.1.0',
    desc: 'security hardening across the api: open redirect protection, security headers, rate limiting, and redis caching.',
  },
  {
    version: 'v1.0.0',
    desc: 'initial release. url shortening with 4-character alphanumeric codes.',
  },
];

function UpdatesPanel({ onClose, style }) {
  return (
    <div className="popout-panel" style={style}>
      <div className="popout-header">
        <span className="popout-title">updates</span>
        <button className="popout-close" onClick={onClose}>×</button>
      </div>
      <div className="popout-body popout-body--updates">
        {CHANGELOG.map((entry) => (
          <p key={entry.version} className="update-entry">
            <span className="update-version">{entry.version}</span>
            <span className="update-sep"> — </span>
            <span className="update-desc">{entry.desc}</span>
          </p>
        ))}
      </div>
    </div>
  );
}

const PANEL_WIDTHS = { donate: 280, updates: 280, about: 400, analytics: 400 };
const MARGIN = 16;

function computeLeft(btnRef, panelWidth) {
  const rect = btnRef.current.getBoundingClientRect();
  const center = rect.left + rect.width / 2;
  let left = center - panelWidth / 2;
  if (left < MARGIN) left = MARGIN;
  if (left + panelWidth > window.innerWidth - MARGIN) {
    left = window.innerWidth - MARGIN - panelWidth;
  }
  return left;
}

export default function BottomBar({ onShortenClick }) {
  const [open, setOpen] = useState(null);
  const [panelLeft, setPanelLeft] = useState(0);
  const [aboutSection, setAboutSection] = useState('what');
  const barRef = useRef(null);
  const donateRef = useRef(null);
  const updatesRef = useRef(null);
  const aboutRef = useRef(null);
  const analyticsRef = useRef(null);

  const toggle = (name, ref) => {
    if (open === name) {
      setOpen(null);
    } else {
      setPanelLeft(computeLeft(ref, PANEL_WIDTHS[name]));
      setOpen(name);
    }
  };

  const openTerms = () => {
    setAboutSection('terms');
    setPanelLeft(computeLeft(aboutRef, PANEL_WIDTHS.about));
    setOpen('about');
  };

  const close = () => setOpen(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (barRef.current && !barRef.current.contains(e.target)) {
        setOpen(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const panelStyle = { left: panelLeft };

  return (
    <div className="bottom-bar" ref={barRef}>
      {open === 'donate' && <DonatePanel onClose={close} style={panelStyle} />}
      {open === 'updates' && <UpdatesPanel onClose={close} style={panelStyle} />}
      {open === 'about' && <AboutPanel onClose={close} style={panelStyle} initialSection={aboutSection} />}
      {open === 'analytics' && <AnalyticsPanel onClose={close} style={panelStyle} />}

      <div className="bar-left">
        <a
          className="bar-btn"
          href="https://github.com/OracleAlsanna"
          target="_blank"
          rel="noreferrer"
          title="contact"
        >
          <span className="bar-btn-icon">
            <IconGitHub />
          </span>
          <span className="bar-btn-label">contact</span>
        </a>

        <button
          ref={analyticsRef}
          className={`bar-btn${open === 'analytics' ? ' active' : ''}`}
          onClick={() => toggle('analytics', analyticsRef)}
          title="analytics"
        >
          <span className="bar-btn-icon">
            <IconChart />
          </span>
          <span className="bar-btn-label">analytics</span>
        </button>
      </div>

      <div className="bar-center">
        <p className="bar-terms">
          by using oracle, you agree to our{' '}
          <button type="button" className="bar-terms-link" onClick={openTerms}>
            terms of use
          </button>
        </p>
      </div>

      <div className="bar-right">
        <button
          ref={donateRef}
          className={`bar-btn${open === 'donate' ? ' active' : ''}`}
          onClick={() => toggle('donate', donateRef)}
          title="donate"
        >
          <span className="bar-btn-icon">
            <IconHeart />
          </span>
          <span className="bar-btn-label">donate</span>
        </button>

        <button
          ref={updatesRef}
          className={`bar-btn${open === 'updates' ? ' active' : ''}`}
          onClick={() => toggle('updates', updatesRef)}
          title="updates"
        >
          <span className="bar-btn-icon">
            <IconStar />
          </span>
          <span className="bar-btn-label">updates</span>
        </button>

        <button
          ref={aboutRef}
          className={`bar-btn${open === 'about' ? ' active' : ''}`}
          onClick={() => {
            setAboutSection('what');
            toggle('about', aboutRef);
          }}
          title="about"
        >
          <span className="bar-btn-icon">
            <IconInfo />
          </span>
          <span className="bar-btn-label">about</span>
        </button>
      </div>
    </div>
  );
}
