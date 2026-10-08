import type { Metadata } from "next";
import { Geist_Mono, Newsreader } from "next/font/google";
import { AppHeader } from "@/components/app-header";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ChatWidget } from "@/modules/chat/components/chat-widget";
import "./globals.css";

const serif = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Renewal Rescue Desk",
  description: "Ranked work queue of at-risk renewals for customer success managers",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${serif.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <TooltipProvider>
          <AppHeader />
          {children}
          <ChatWidget />
        </TooltipProvider>
        <Toaster />
      </body>
    </html>
  );
}
