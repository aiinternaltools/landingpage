import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aiinternaltools.com"),
  title: {
    default:
      "AI Internal Tools — AI automation for operational businesses",
    template: "%s · aiinternaltools.com",
  },
  description:
    "Practical AI systems and automations for operational teams: workflow automation, agents, internal tools, and knowledge assistants. Try demos, then scope custom work.",
  icons: {
    icon: "/faviconAIT.png",
    apple: "/faviconAIT.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* suppressHydrationWarning: browser extensions (e.g. ColorZilla cz-*, wallets) inject attributes on <body> before React hydrates */}
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col font-sans text-foreground bg-background"
      >
        <Navbar />
        <div className="flex min-w-0 flex-1 flex-col overflow-x-hidden">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
