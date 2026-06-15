import { useEffect } from 'react';
import './Toast.css';

const DISMISS_DELAY = 3000;

export default function Toast({ message, type, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, DISMISS_DELAY);
    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  return (
    <div className={`toast toast--${type}`} role="alert">
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={onDismiss} aria-label="Dismiss">
        ×
      </button>
    </div>
  );
}
