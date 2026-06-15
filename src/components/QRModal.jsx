import './QRModal.css';

const BASE = 'http://localhost:8000';

export default function QRModal({ code, onClose }) {
  const target = `${BASE}/${encodeURIComponent(code)}`;
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(target)}`;

  return (
    <div className="qr-overlay" onClick={onClose}>
      <div className="qr-modal" onClick={(e) => e.stopPropagation()}>
        <button className="qr-close" onClick={onClose}>×</button>
        <img
          src={qrSrc}
          alt={`qr code for ${code}`}
          width={200}
          height={200}
          className="qr-image"
        />
        <p className="qr-label">localhost:8000/{code}</p>
      </div>
    </div>
  );
}
