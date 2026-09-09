import { useState } from 'react';
import './LinkRow.css';

function formatDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function truncateUrl(url, max = 50) {
  return url.length <= max ? url : url.slice(0, max) + '…';
}

function IconQR() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="3" height="3" rx="0.5" />
      <line x1="18" y1="14" x2="21" y2="14" />
      <line x1="21" y1="17" x2="21" y2="21" />
      <line x1="18" y1="21" x2="21" y2="21" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13" title="password protected">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export default function LinkRow({ link, onDelete, onShowQR }) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const shortUrl = `http://localhost:8000/${link.name}`;

  const handleConfirm = async () => {
    setDeleting(true);
    await onDelete(link.name);
  };

  return (
    <tr className={`link-row${deleting ? ' link-row--deleting' : ''}`}>
      <td>
        <a href={shortUrl} target="_blank" rel="noreferrer" className="code-link">
          {link.name}
        </a>
        {link.protected && (
          <span className="row-badge row-badge--lock">
            <IconLock />
          </span>
        )}
        {link.expires_at && (
          <span className="row-badge row-badge--expiry" title={`expires ${formatDate(link.expires_at)}`}>
            exp
          </span>
        )}
      </td>
      <td>
        <button
          className="qr-btn"
          onClick={() => onShowQR(link.name)}
          aria-label={`show qr for ${link.name}`}
        >
          <IconQR />
        </button>
      </td>
      <td>
        <span className="url-cell" title={link.url}>
          {truncateUrl(link.url)}
        </span>
      </td>
      <td className="date-cell">{formatDate(link.created_at)}</td>
      <td>
        {confirming ? (
          <span className="confirm-inline">
            <span className="confirm-q">delete?</span>
            <button
              className="confirm-yes"
              onClick={handleConfirm}
              disabled={deleting}
            >
              y
            </button>
            <button
              className="confirm-no"
              onClick={() => setConfirming(false)}
              disabled={deleting}
            >
              n
            </button>
          </span>
        ) : (
          <button
            className="delete-x"
            onClick={() => setConfirming(true)}
            aria-label={`delete ${link.name}`}
            disabled={deleting}
          >
            ×
          </button>
        )}
      </td>
    </tr>
  );
}
