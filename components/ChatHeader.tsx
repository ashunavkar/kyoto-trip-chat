export default function ChatHeader() {
  return (
    <header className="shrink-0 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
        <div
          aria-hidden
          className="grid size-9 place-items-center rounded-full bg-rose text-sm font-semibold text-white"
        >
          TP
        </div>
        <div className="min-w-0">
          <h1 className="text-[15px] font-semibold leading-tight">Trip Planner</h1>
          <p className="text-[13px] leading-tight text-ink-soft">Weekend ideas, one message away</p>
        </div>
      </div>
    </header>
  );
}
