import ChatApp from "@/components/ChatApp";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ fail?: string }>;
}) {
  const { fail } = await searchParams;
  return <ChatApp failOnce={fail === "once"} />;
}
