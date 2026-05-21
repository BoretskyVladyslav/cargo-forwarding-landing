/** Metric + Why icons — animation hooks live in globals.css (`.metric-*`, `.why-*`). */

const metricSvgProps = {
  className: "landing-icon-metric h-11 w-11 shrink-0 text-brand-gold",
  viewBox: "0 0 48 48",
  fill: "none" as const,
  "aria-hidden": true,
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const whySvgProps = {
  className: "landing-icon-why h-10 w-10 shrink-0 text-brand-gold",
  fill: "none" as const,
  "aria-hidden": true,
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function WheelSpokes({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r} />
      <line x1={cx} y1={cy - r + 1.2} x2={cx} y2={cy + r - 1.2} strokeWidth={1.1} />
      <line x1={cx - r + 1.2} y1={cy} x2={cx + r - 1.2} y2={cy} strokeWidth={1.1} />
    </>
  );
}

export function MetricFleetIcon() {
  return (
    <svg {...metricSvgProps}>
      <path
        fill="currentColor"
        fillOpacity={0.09}
        stroke="currentColor"
        d="M3 36V20h19l5-7h14v23H3z"
      />
      <path d="M22 13h5l4 7" strokeWidth={1.25} opacity={0.7} />
      <path d="M8 28h28" strokeWidth={1.05} opacity={0.45} />
      <g className="metric-wheel motion-reduce:!animate-none">
        <WheelSpokes cx={13} cy={36} r={5.25} />
      </g>
      <g className="metric-wheel motion-reduce:!animate-none">
        <WheelSpokes cx={33} cy={36} r={5.25} />
      </g>
      <circle cx={13} cy={36} r={1.85} fill="currentColor" stroke="none" />
      <circle cx={33} cy={36} r={1.85} fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MetricScaleIcon() {
  return (
    <svg {...metricSvgProps}>
      <circle
        cx={24}
        cy={24}
        r={21}
        className="text-brand-gold-muted"
        stroke="currentColor"
        strokeOpacity={0.42}
        strokeWidth={1.1}
        strokeDasharray="4 12"
      />
      <g className="metric-radar motion-reduce:!animate-none">
        <circle
          cx={24}
          cy={24}
          r={16}
          fill="currentColor"
          fillOpacity={0.07}
          stroke="currentColor"
          strokeOpacity={0.28}
          strokeWidth={0.85}
        />
        <circle
          cx={24}
          cy={24}
          r={11}
          stroke="currentColor"
          strokeOpacity={0.22}
          strokeWidth={0.75}
          strokeDasharray="6 10"
        />
        <line x1={24} y1={24} x2={24} y2={8} strokeWidth={1.6} />
        <line x1={24} y1={24} x2={38} y2={30} strokeWidth={1.35} opacity={0.55} />
      </g>
      <circle cx={24} cy={24} r={2.5} fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MetricShieldIcon() {
  return (
    <svg {...metricSvgProps} className={`${metricSvgProps.className} metric-shield-wrap`}>
      <defs>
        <clipPath id="metric-shield-clip">
          <path d="M24 43s15-10 15-22V13l-15-8-15 8v8c0 12 15 22 15 22z" />
        </clipPath>
        <linearGradient id="metric-shield-shine-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="currentColor" stopOpacity={0} />
          <stop offset="45%" stopColor="currentColor" stopOpacity={0.55} />
          <stop offset="55%" stopColor="currentColor" stopOpacity={0.55} />
          <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
        </linearGradient>
      </defs>
      <path
        fill="currentColor"
        fillOpacity={0.08}
        stroke="currentColor"
        d="M24 43s15-10 15-22V13l-15-8-15 8v8c0 12 15 22 15 22z"
      />
      <path d="M17.5 25.5l5.5 6.5 13.5-17" strokeWidth={1.85} />
      <g clipPath="url(#metric-shield-clip)">
        <rect
          className="metric-shield-shine motion-reduce:!animate-none"
          x={-16}
          y={4}
          width={14}
          height={40}
          fill="url(#metric-shield-shine-grad)"
          opacity={0.85}
        />
      </g>
    </svg>
  );
}

export function MetricPinIcon() {
  return (
    <svg {...metricSvgProps}>
      <circle
        cx={24}
        cy={24}
        r={18}
        className="text-brand-gold-muted"
        stroke="currentColor"
        strokeOpacity={0.38}
        strokeWidth={0.95}
      />
      <ellipse
        cx={24}
        cy={24}
        rx={18}
        ry={11}
        stroke="currentColor"
        strokeOpacity={0.26}
        strokeWidth={0.95}
      />
      <path
        fill="currentColor"
        fillOpacity={0.12}
        stroke="currentColor"
        strokeWidth={1.15}
        d="M24 8c-3.8 0-6.9 3-6.9 6.7 0 4.7 6.9 13.3 6.9 13.3S30.9 19.4 30.9 14.7C30.9 11 27.8 8 24 8z"
      />
      <circle cx={24} cy={14.5} r={2.35} fill="currentColor" stroke="none" />
      <g className="metric-pin-ring motion-reduce:!animate-none">
        <circle
          cx={24}
          cy={14.5}
          r={10.5}
          stroke="currentColor"
          strokeOpacity={0.55}
          strokeWidth={0.9}
        />
      </g>
      <g className="metric-pin-ring metric-pin-ring--delay motion-reduce:!animate-none">
        <circle
          cx={24}
          cy={14.5}
          r={14}
          stroke="currentColor"
          strokeOpacity={0.32}
          strokeWidth={0.7}
        />
      </g>
    </svg>
  );
}

export function WhyTruckMotionIcon() {
  return (
    <svg {...whySvgProps} viewBox="0 0 44 32">
      <g className="why-truck-body motion-reduce:!animate-none">
        <path
          fill="currentColor"
          fillOpacity={0.1}
          stroke="currentColor"
          strokeWidth={1.35}
          d="M2 26V14h18l4-6h14v18H2z"
        />
        <path d="M20 8h5l3.5 6" strokeWidth={1.15} opacity={0.65} />
        <path d="M6 20h30" strokeWidth={1} opacity={0.4} />
        <circle cx={11} cy={26} r={4.5} strokeWidth={1.2} className="fill-brand-card" />
        <circle cx={30} cy={26} r={4.5} strokeWidth={1.2} className="fill-brand-card" />
        <circle cx={11} cy={26} r={1.65} fill="currentColor" stroke="none" />
        <circle cx={30} cy={26} r={1.65} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

export function WhyContractMotionIcon() {
  const lines = [
    { y: 14, w: 20 },
    { y: 20.5, w: 18 },
    { y: 27, w: 16 },
    { y: 33.5, w: 14 },
  ] as const;

  return (
    <svg
      {...whySvgProps}
      className="landing-icon-why h-10 w-10 shrink-0 text-brand-gold-muted"
      viewBox="0 0 40 44"
      strokeWidth={1.15}
    >
      <rect
        x={7}
        y={6}
        width={26}
        height={32}
        rx={3.5}
        fill="currentColor"
        fillOpacity={0.06}
        stroke="currentColor"
      />
      <path
        d="M13 6v6h8"
        strokeWidth={1.05}
        className="text-brand-gold"
        stroke="currentColor"
        strokeOpacity={0.75}
      />
      {lines.map((line, i) => (
        <line
          key={line.y}
          x1={13}
          y1={line.y}
          x2={13 + line.w}
          y2={line.y}
          className="why-doc-line motion-reduce:!animate-none"
          style={{ animationDelay: `${i * 0.35}s` }}
          stroke="currentColor"
          strokeOpacity={0.72}
          strokeWidth={1.05}
          pathLength={100}
          strokeDasharray="100"
          strokeDashoffset={100}
        />
      ))}
    </svg>
  );
}

export function WhyRouteMotionIcon() {
  return (
    <svg
      {...whySvgProps}
      className="landing-icon-why h-10 w-10 shrink-0 text-brand-gold-muted"
      viewBox="0 0 42 42"
      strokeWidth={1.25}
    >
      <g className="why-gear motion-reduce:!animate-none">
        <circle
          cx={21}
          cy={21}
          r={14}
          stroke="currentColor"
          strokeOpacity={0.35}
          strokeWidth={1}
        />
        {[0, 45, 90, 135].map((deg) => (
          <rect
            key={deg}
            x={19.25}
            y={5}
            width={3.5}
            height={6}
            rx={1}
            fill="currentColor"
            fillOpacity={0.85}
            stroke="none"
            transform={`rotate(${deg} 21 21)`}
          />
        ))}
        <circle
          cx={21}
          cy={21}
          r={7.5}
          fill="currentColor"
          fillOpacity={0.08}
          stroke="currentColor"
          strokeOpacity={0.5}
        />
      </g>
      <g className="why-gear-dots motion-reduce:!animate-none">
        <circle cx={21} cy={8.5} r={1.65} fill="currentColor" className="text-brand-gold" />
        <circle cx={33.5} cy={21} r={1.65} fill="currentColor" className="text-brand-gold" />
        <circle cx={21} cy={33.5} r={1.65} fill="currentColor" className="text-brand-gold" />
        <circle cx={8.5} cy={21} r={1.65} fill="currentColor" className="text-brand-gold" />
      </g>
      <circle cx={21} cy={21} r={2.25} fill="currentColor" stroke="none" className="text-brand-gold" />
    </svg>
  );
}
