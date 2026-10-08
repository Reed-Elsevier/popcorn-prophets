import Link from "next/link";
import { AS_OF } from "@/modules/signals/score";

const nav = [
  { href: "/", label: "Queue" },
  { href: "/upload", label: "Upload account" },
  { href: "/reliability", label: "Reliability" },
];

export function AppHeader() {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-6 px-6">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="inline-block size-3 rounded-full bg-white" />
          Renewal Rescue Desk
        </Link>
        <nav className="flex flex-1 items-center gap-4 text-sm font-medium">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="opacity-80 hover:opacity-100">
              {item.label}
            </Link>
          ))}
        </nav>
        <span className="text-xs opacity-80">Data as of {AS_OF}</span>
      </div>
    </header>
  );
}
