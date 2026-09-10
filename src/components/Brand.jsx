import './Brand.css';

function IconSparkle() {
  return (
    <svg className="brand-star" viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true">
      <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" />
    </svg>
  );
}

export default function Brand() {
  return (
    <div className="brand">
      <IconSparkle />
      <span className="brand-name">oracle</span>
    </div>
  );
}
