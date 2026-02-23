import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "kBANK Scoring Pilot",
  description: "Pilot digital scoring and learning flow"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
