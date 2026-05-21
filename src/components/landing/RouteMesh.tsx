export default function RouteMesh() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0A0A0A]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_-8%,rgba(212,175,55,0.055)_0%,transparent_54%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_92%_32%,rgba(251,191,36,0.04)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(251,191,36,0.025)_0%,transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_42%,rgba(10,10,10,0.88)_94%)]" />
    </div>
  );
}
