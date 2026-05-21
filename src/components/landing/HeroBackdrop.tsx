/** Hero-only soft spotlights behind copy and lead form — no dashed map lines. */
export default function HeroBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[0] overflow-hidden"
    >
      <div className="absolute -left-[12%] top-[4%] h-[clamp(260px,70vmin,640px)] w-[clamp(260px,70vmin,640px)] rounded-full bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.11)_0%,rgba(212,175,55,0.06)_36%,transparent_68%)] blur-3xl sm:left-[0%]" />
      <div className="absolute -right-[20%] top-[26%] h-[clamp(240px,62vmin,520px)] w-[clamp(240px,62vmin,520px)] rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.095)_0%,rgba(251,191,36,0.05)_38%,transparent_66%)] blur-[3.5rem] sm:-right-[8%] md:right-[4%]" />
      <div className="absolute inset-x-0 bottom-0 top-1/2 bg-[radial-gradient(ellipse_120%_80%_at_50%_0%,transparent_46%,rgba(10,10,10,0.5)_94%)]" />
    </div>
  );
}
