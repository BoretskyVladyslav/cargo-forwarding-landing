"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";

function subscribeReducedMotion(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const revealMotion =
  "transform-gpu transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none motion-reduce:duration-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:pointer-events-auto";

export default function Reveal({
  children,
  className = "",
  style,
  delayMs,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );

  const [intersectSeen, setIntersectSeen] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || intersectSeen) return;

    const node = ref.current;
    if (!node) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIntersectSeen(true);
        obs.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [prefersReducedMotion, intersectSeen]);

  const visible = prefersReducedMotion || intersectSeen;

  return (
    <div
      ref={ref}
      className={`${revealMotion} ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-[20px] opacity-0"
      } ${className}`}
      style={{
        ...style,
        ...(delayMs !== undefined
          ? { transitionDelay: visible ? `${delayMs}ms` : "0ms" }
          : {}),
      }}
    >
      {children}
    </div>
  );
}
