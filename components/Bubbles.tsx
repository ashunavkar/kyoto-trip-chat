import type { ReactNode } from "react";

export function UserBubble({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-end animate-rise">
      <p className="max-w-[80%] rounded-2xl rounded-br-md bg-ink px-4 py-2.5 text-[15px] leading-snug text-white">
        {children}
      </p>
    </div>
  );
}

export function AssistantBubble({ children }: { children: ReactNode }) {
  return (
    <div className="flex animate-rise">
      <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-line bg-white px-4 py-2.5 text-[15px] leading-snug">
        {children}
      </div>
    </div>
  );
}
