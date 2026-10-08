import { UploadForm } from "@/modules/upload/components/upload-form";

export default function UploadPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-4 px-6 py-8">
      <h1 className="text-2xl font-bold">Score an unseen account</h1>
      <p className="text-muted-foreground text-sm">
        Skeleton: paste computed signals as JSON and score them with the same rules as the queue. Next: LLM
        extraction from CSV / pasted text, with a confirm step.
      </p>
      <UploadForm />
    </main>
  );
}
