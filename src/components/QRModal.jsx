import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import './QRModal.css';

const BASE = 'http://localhost:8000';

export default function QRModal({ code, onClose }) {
  const canvasRef = useRef(null);
  const [error, setError] = useState(false);
  const target = `${BASE}/${encodeURIComponent(code)}`;

  useEffect(() => {
    if (!canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, target, { width: 200, margin: 1 }, (err) => {
      if (err) setError(true);
    });
  }, [target]);

  return (
    <div className="qr-overlay" onClick={onClose}>
      <div className="qr-modal" onClick={(e) => e.stopPropagation()}>
        <button className="qr-close" onClick={onClose}>×</button>
        {error ? (
          <p className="qr-label">could not generate qr code.</p>
        ) : (
          <canvas ref={canvasRef} className="qr-image" width={200} height={200} />
        )}
        <p className="qr-label">localhost:8000/{code}</p>
        <p className="qr-hint">generated locally — nothing sent to a third party</p>
      </div>
    </div>
  );
}
