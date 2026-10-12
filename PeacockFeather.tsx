import { useMemo } from "react";

// Procedurally drawn peacock feather: curved quill, two rows of iridescent barbs, and the "eye".
// Quill nib sits near bottom-left (≈ 17% / 95%) so it can be pinned to a writing point.
const P = [
  [22, 392],
  [40, 292],
  [62, 150],
  [86, 40],
];

function bez(t: number) {
  const u = 1 - t;
  const x = u * u * u * P[0][0] + 3 * u * u * t * P[1][0] + 3 * u * t * t * P[2][0] + t * t * t * P[3][0];
  const y = u * u * u * P[0][1] + 3 * u * u * t * P[1][1] + 3 * u * t * t * P[2][1] + t * t * t * P[3][1];
  return [x, y];
}
function der(t: number) {
  const u = 1 - t;
  const x = 3 * u * u * (P[1][0] - P[0][0]) + 6 * u * t * (P[2][0] - P[1][0]) + 3 * t * t * (P[3][0] - P[2][0]);
  const y = 3 * u * u * (P[1][1] - P[0][1]) + 6 * u * t * (P[2][1] - P[1][1]) + 3 * t * t * (P[3][1] - P[2][1]);
  const m = Math.hypot(x, y);
  return [x / m, y / m];
}

export default function PeacockFeather({ className = "" }: { className?: string }) {
  const { barbs, eye } = useMemo(() => {
    const out: { d: string; c: string }[] = [];
    const N = 78;
    for (let k = 0; k < N; k++) {
      const t = 0.2 + (0.72 * k) / N;
      const [x, y] = bez(t);
      const [dx, dy] = der(t);
      const nx = -dy;
      const ny = dx;
      const u = (t - 0.2) / 0.78;
      const len = 6 + 30 * Math.sin(Math.PI * Math.min(1, u)) ** 0.8;
      for (const s of [-1, 1]) {
        const ex = x + s * nx * len * 0.9 + dx * len * 0.95;
        const ey = y + s * ny * len * 0.9 + dy * len * 0.95;
        const cx = x + s * nx * len * 0.5 + dx * len * 0.2;
        const cy = y + s * ny * len * 0.5 + dy * len * 0.2;
        out.push({
          d: `M${x.toFixed(1)} ${y.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`,
          c: k % 3 === 0 ? "#c9a24b" : k % 3 === 1 ? "#1c7a52" : "#12606b",
        });
      }
    }
    const [ex, ey] = bez(0.9);
    const [dx, dy] = der(0.9);
    return { barbs: out, eye: { x: ex, y: ey, a: (Math.atan2(dy, dx) * 180) / Math.PI } };
  }, []);

  return (
    <svg className={className} viewBox="0 0 130 410" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="eyeCore" cx="45%" cy="40%" r="70%">
          <stop offset="0" stopColor="#2a8fb0" />
          <stop offset="1" stopColor="#0b2c4a" />
        </radialGradient>
      </defs>
      <g strokeWidth="1.9" strokeLinecap="round">
        {barbs.map((b, i) => (
          <path key={i} d={b.d} stroke={b.c} />
        ))}
      </g>
      <path d={`M${P[0][0]} ${P[0][1]} C${P[1][0]} ${P[1][1]} ${P[2][0]} ${P[2][1]} ${P[3][0]} ${P[3][1]}`} stroke="#8a6a2a" strokeWidth="2.2" strokeLinecap="round" />
      <g transform={`translate(${eye.x.toFixed(1)} ${eye.y.toFixed(1)}) rotate(${eye.a.toFixed(1)})`}>
        <ellipse rx="24" ry="17" fill="#1f7a63" />
        <ellipse rx="19" ry="13.5" fill="#d3a63f" />
        <ellipse rx="14" ry="10" fill="#2a7f8f" />
        <ellipse rx="10" ry="7.2" fill="url(#eyeCore)" />
        <ellipse rx="4.6" ry="3.4" fill="#06141f" />
        <ellipse cx="-1.6" cy="-1.4" rx="1.6" ry="1" fill="#9fd8e8" opacity="0.8" />
      </g>
    </svg>
  );
}
