import Providers from "@/components/providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
    <html lang="en" className="text-sm bg-slate-100 font-medium">
      <body className={inter.className}>
        <Providers>
          <ReactQueryDevtools initialIsOpen={false} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
