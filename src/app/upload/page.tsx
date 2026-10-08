import { UploadForm } from "@/modules/upload/components/upload-form";

export default function UploadPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-4 px-6 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Score an unseen account</h1>
      <p className="text-muted-foreground text-sm">
        Upload a CSV/XLSX or paste text. AI extracts usage and cases, you confirm the values, then the same scoring
        rules as the queue run.
      </p>
      <UploadForm />
    </main>
  );
}
