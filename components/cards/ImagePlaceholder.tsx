// Grey box standing in for a photo. Image rights are not cleared yet.
export default function ImagePlaceholder({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`grid place-items-center bg-placeholder ${className}`}>
      <svg viewBox="0 0 24 24" className="size-6 text-black/20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="9" cy="10" r="1.5" />
        <path d="m21 16-5-5-8 8" />
      </svg>
    </div>
  );
}
