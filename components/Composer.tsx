"use client";

import { useEffect, useRef, useState } from "react";

export default function Composer({ busy, onSend }: { busy: boolean; onSend: (text: string) => void }) {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const canSend = !busy && text.trim().length > 0;

  // Put the cursor back in the box once the reply has landed.
  useEffect(() => {
    if (!busy) inputRef.current?.focus();
  }, [busy]);

  return (
    <form
      className="shrink-0 border-t border-line bg-white px-4 pb-[max(env(safe-area-inset-bottom),12px)] pt-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (!canSend) return;
        onSend(text.trim());
        setText("");
      }}
    >
      <div
        className={`mx-auto flex max-w-2xl items-center gap-2 rounded-full border bg-white py-1.5 pl-4 pr-1.5 transition ${
          busy ? "border-line bg-canvas" : "border-ink/20 focus-within:border-ink"
        }`}
      >
        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <input
          ref={inputRef}
          id="message"
          autoComplete="off"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={busy}
          placeholder={busy ? "Planning your trip…" : "Ask for a trip, like Kyoto"}
          className="min-w-0 flex-1 bg-transparent py-1.5 text-base outline-none placeholder:text-ink-soft disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={!canSend}
          className="shrink-0 rounded-full bg-rose px-4 py-2 text-sm font-semibold text-white transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-not-allowed disabled:bg-ink/15 disabled:text-ink-soft"
        >
          Send
        </button>
      </div>
    </form>
  );
}
