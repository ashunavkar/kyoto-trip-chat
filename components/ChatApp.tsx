"use client";

import { useEffect, useRef, useState } from "react";
import type { ChatMessage, TripCard } from "@/lib/types";
import { isTripCardList } from "@/lib/format";
import ChatHeader from "./ChatHeader";
import Composer from "./Composer";
import ThinkingDots from "./ThinkingDots";
import ErrorBubble from "./ErrorBubble";
import { AssistantBubble, UserBubble } from "./Bubbles";
import CardStack from "./cards/CardStack";

const SUGGESTION = "Plan a weekend in Kyoto for two";

let counter = 0;
const newId = () => `m${++counter}`;

export default function ChatApp({ failOnce }: { failOnce: boolean }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      kind: "text",
      text: "Hi! Tell me where you want to go and I'll put together a place to stay, something to do and somewhere to eat.",
    },
  ]);
  const [busy, setBusy] = useState(false);
  // With ?fail=once, only the very first request gets a broken answer.
  const shouldFail = useRef(failOnce);
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function askAssistant(thinkingId: string, text: string) {
    const fail = shouldFail.current;
    shouldFail.current = false;

    let reply: ChatMessage;
    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, fail }),
      });
      const data: unknown = JSON.parse(await res.text());
      if (!res.ok || !isTripCardList(data)) throw new Error("Unreadable answer");
      reply = {
        id: thinkingId,
        role: "assistant",
        kind: "cards",
        intro: "Here's a two-night weekend in Kyoto, Fri 11 to Sun 13 Apr.",
        cards: data as TripCard[],
      };
    } catch {
      reply = { id: thinkingId, role: "assistant", kind: "error", retryText: text };
    }
    // Swap the thinking bubble for the real reply, in place.
    setMessages((prev) => prev.map((m) => (m.id === thinkingId ? reply : m)));
    setBusy(false);
  }

  function send(text: string) {
    if (busy) return;
    const thinkingId = newId();
    setBusy(true);
    setMessages((prev) => [
      ...prev,
      { id: newId(), role: "user", text },
      { id: thinkingId, role: "assistant", kind: "thinking" },
    ]);
    askAssistant(thinkingId, text);
  }

  function retry(errorId: string, text: string) {
    if (busy) return;
    setBusy(true);
    // The error bubble turns back into the thinking bubble, so the thread never empties.
    setMessages((prev) =>
      prev.map((m) => (m.id === errorId ? { id: errorId, role: "assistant", kind: "thinking" } : m)),
    );
    askAssistant(errorId, text);
  }

  const onlyWelcome = messages.length === 1;

  return (
    <div className="flex h-dvh flex-col">
      <ChatHeader />

      <div ref={threadRef} className="flex-1 overflow-y-auto">
        <div role="log" aria-live="polite" className="mx-auto max-w-2xl space-y-4 px-4 py-6">
          {messages.map((m) => {
            if (m.role === "user") return <UserBubble key={m.id}>{m.text}</UserBubble>;
            switch (m.kind) {
              case "text":
                return <AssistantBubble key={m.id}>{m.text}</AssistantBubble>;
              case "thinking":
                return (
                  <AssistantBubble key={m.id}>
                    <ThinkingDots />
                  </AssistantBubble>
                );
              case "error":
                return <ErrorBubble key={m.id} disabled={busy} onRetry={() => retry(m.id, m.retryText)} />;
              case "cards":
                return (
                  <div key={m.id} className="space-y-3">
                    <AssistantBubble>{m.intro}</AssistantBubble>
                    <div className="sm:max-w-[85%]">
                      <CardStack cards={m.cards} />
                    </div>
                  </div>
                );
            }
          })}

          {onlyWelcome && (
            <div className="flex animate-rise">
              <button
                type="button"
                onClick={() => send(SUGGESTION)}
                className="rounded-full border border-line bg-white px-3.5 py-2 text-sm text-ink transition hover:border-ink/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
              >
                {SUGGESTION}
              </button>
            </div>
          )}
        </div>
      </div>

      <Composer busy={busy} onSend={send} />
    </div>
  );
}
