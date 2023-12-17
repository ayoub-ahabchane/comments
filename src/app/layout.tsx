import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Comments",
  description:
    "A fullstack mini demo project featuring a social media post with a comments section",
  authors: [
    { name: "Ayoub Ahabchane", url: "https://github.com/ayoub-ahabchane" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="text-sm">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
