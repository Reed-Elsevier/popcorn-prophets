import { Chat } from "@/modules/chat/components/chat";

export default function AskPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-4 px-6 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Ask your portfolio</h1>
      <p className="text-muted-foreground text-sm">
        Answers come from AI using read-only queries over your accounts. Expand &ldquo;Data queried&rdquo; to see exactly
        what was looked up. Verify before acting.
      </p>
      <Chat />
    </main>
  );
}
