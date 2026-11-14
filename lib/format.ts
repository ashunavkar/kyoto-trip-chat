const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function parse(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m, d, time: Date.UTC(y, m - 1, d) };
}

// "2025-04-11" + "2025-04-13" -> "11 to 13 Apr 2025 · 2 nights"
export function formatStayDates(checkIn: string, checkOut: string) {
  const a = parse(checkIn);
  const b = parse(checkOut);
  const nights = Math.round((b.time - a.time) / 86_400_000);
  const start =
    a.y !== b.y ? `${a.d} ${MONTHS[a.m - 1]} ${a.y}` : a.m !== b.m ? `${a.d} ${MONTHS[a.m - 1]}` : `${a.d}`;
  const range = `${start} to ${b.d} ${MONTHS[b.m - 1]} ${b.y}`;
  return `${range} · ${nights} ${nights === 1 ? "night" : "nights"}`;
}

// Checks the answer really is a list of stay, experience, food cards.
export function isTripCardList(value: unknown): boolean {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every(
      (c) =>
        c &&
        typeof c === "object" &&
        ["stay", "experience", "food"].includes((c as { cardType?: string }).cardType ?? "") &&
        typeof (c as { details?: unknown }).details === "object",
    )
  );
}
