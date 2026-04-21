export function BootcampIllustration() {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <defs>
        <linearGradient id="bootBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a1d2a" />
          <stop offset="100%" stopColor="#2a1f2a" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#bootBg)" />
      <text x="200" y="162" textAnchor="middle" fontSize="120" fontWeight="300" fill="#ffffff" fillOpacity="0.07" fontFamily="inherit">
        77.8%
      </text>
      <line x1="40" y1="220" x2="360" y2="220" stroke="rgba(202,209,230,0.35)" strokeWidth="0.7" />
      <line x1="40" y1="60" x2="40" y2="220" stroke="rgba(202,209,230,0.35)" strokeWidth="0.7" />
      <line x1="120" y1="100" x2="120" y2="220" stroke="rgba(202,209,230,0.22)" strokeWidth="0.6" strokeDasharray="3,3" />
      <line x1="200" y1="100" x2="200" y2="220" stroke="rgba(202,209,230,0.22)" strokeWidth="0.6" strokeDasharray="3,3" />
      <line x1="280" y1="100" x2="280" y2="220" stroke="rgba(202,209,230,0.22)" strokeWidth="0.6" strokeDasharray="3,3" />
      <line x1="360" y1="100" x2="360" y2="220" stroke="rgba(202,209,230,0.22)" strokeWidth="0.6" strokeDasharray="3,3" />
      <path d="M40,200 L120,185 L200,165 L280,140 L360,100 L360,220 L40,220 Z" fill="rgba(227,6,19,0.12)" />
      <polyline points="40,200 120,185 200,165 280,140 360,100" stroke="#ff5d68" strokeWidth="2" fill="none" />
      <circle cx="40" cy="200" r="3" fill="#ffd6d8" />
      <circle cx="120" cy="185" r="3" fill="#ffd6d8" />
      <circle cx="200" cy="165" r="3" fill="#ffd6d8" />
      <circle cx="280" cy="140" r="3" fill="#ffd6d8" />
      <circle cx="360" cy="100" r="4" fill="#ffd6d8" />
      <text x="100" y="248" textAnchor="middle" fontSize="16" fontWeight="500" fill="#f3f4f8" fontFamily="inherit">
        23
      </text>
      <text x="100" y="262" textAnchor="middle" fontSize="9" fill="rgba(202,209,230,0.78)" fontFamily="inherit">
        компании
      </text>
      <text x="200" y="248" textAnchor="middle" fontSize="16" fontWeight="500" fill="#f3f4f8" fontFamily="inherit">
        77.8%
      </text>
      <text x="200" y="262" textAnchor="middle" fontSize="9" fill="rgba(202,209,230,0.78)" fontFamily="inherit">
        NPS
      </text>
      <text x="300" y="248" textAnchor="middle" fontSize="16" fontWeight="500" fill="#f3f4f8" fontFamily="inherit">
        +23%
      </text>
      <text x="300" y="262" textAnchor="middle" fontSize="9" fill="rgba(202,209,230,0.78)" fontFamily="inherit">
        рост компетенций
      </text>
    </svg>
  );
}
