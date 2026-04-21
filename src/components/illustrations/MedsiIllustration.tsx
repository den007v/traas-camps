export function MedsiIllustration() {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <defs>
        <radialGradient id="medsiBg" cx="38%" cy="22%" r="82%">
          <stop offset="0%" stopColor="#3a1921" />
          <stop offset="58%" stopColor="#221a27" />
          <stop offset="100%" stopColor="#171824" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="url(#medsiBg)" />
      <line x1="200" y1="150" x2="200" y2="42" stroke="rgba(202,209,230,0.24)" strokeWidth="0.8" />
      <line x1="200" y1="150" x2="295" y2="96" stroke="rgba(202,209,230,0.24)" strokeWidth="0.8" />
      <line x1="200" y1="150" x2="295" y2="204" stroke="rgba(202,209,230,0.24)" strokeWidth="0.8" />
      <line x1="200" y1="150" x2="200" y2="258" stroke="rgba(202,209,230,0.24)" strokeWidth="0.8" />
      <line x1="200" y1="150" x2="105" y2="204" stroke="rgba(202,209,230,0.24)" strokeWidth="0.8" />
      <line x1="200" y1="150" x2="105" y2="96" stroke="rgba(202,209,230,0.24)" strokeWidth="0.8" />
      <polygon points="200,42 295,96 295,204 200,258 105,204 105,96" fill="none" stroke="rgba(202,209,230,0.22)" strokeWidth="0.8" />
      <polygon points="200,85 257,117 257,183 200,215 143,183 143,117" fill="none" stroke="rgba(202,209,230,0.2)" strokeWidth="0.8" />
      <polygon points="200,117 228,133 228,167 200,183 172,167 172,133" fill="none" stroke="rgba(202,209,230,0.18)" strokeWidth="0.8" />
      <polygon points="200,65 278,109 285,194 200,240 118,188 130,102" fill="rgba(227,6,19,0.22)" stroke="#ff5e68" strokeWidth="1.5" />
      <circle cx="200" cy="150" r="4" fill="#ffd4d7" />
    </svg>
  );
}
