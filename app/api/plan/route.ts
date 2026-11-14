import { BROKEN_RESPONSE, KYOTO_WEEKEND } from "@/lib/mockResponse";

// Stand-in for a real assistant. It waits a moment, like a model would,
// then returns the fixed Kyoto weekend. When asked to fail, it returns
// a cut-off answer that the chat cannot read.
const THINKING_DELAY_MS = 1800;

export async function POST(request: Request) {
  const { fail } = (await request.json().catch(() => ({}))) as { fail?: boolean };

  await new Promise((resolve) => setTimeout(resolve, THINKING_DELAY_MS));

  if (fail) {
    return new Response(BROKEN_RESPONSE, {
      headers: { "Content-Type": "application/json" },
    });
  }
  return Response.json(KYOTO_WEEKEND);
}
