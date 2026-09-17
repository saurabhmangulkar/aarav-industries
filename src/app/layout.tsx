import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aarav Industries | Quality Manufacturing. Reliable Solutions.",
  description: "Premier Indian manufacturing company producing precision fasteners, CNC components, and industrial fabrication.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}