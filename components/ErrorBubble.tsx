import { AssistantBubble } from "./Bubbles";

export default function ErrorBubble({
  onRetry,
  disabled,
}: {
  onRetry: () => void;
  disabled: boolean;
}) {
  return (
    <AssistantBubble>
      <p role="alert">
        Sorry, I couldn&rsquo;t put your Kyoto weekend together just now. Let&rsquo;s give it another go.
      </p>
      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={onRetry}
          disabled={disabled}
          className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose disabled:cursor-not-allowed disabled:opacity-40"
        >
          Try again
        </button>
      </div>
    </AssistantBubble>
  );
}
