export default function ThinkingDots() {
  return (
    <div className="flex items-center gap-1.5 py-1" role="status">
      <span className="sr-only">Planning your trip</span>
      {[0, 160, 320].map((delay) => (
        <span
          key={delay}
          aria-hidden
          className="dot-reduced size-2 animate-dot rounded-full bg-ink-soft"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </div>
  );
}
