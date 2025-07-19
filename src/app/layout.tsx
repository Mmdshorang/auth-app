import type { Metadata } from "next";
import "./globals.scss";
import Providers from "./providers/Providers";
import "@fontsource/vazir/index.css";

export const metadata: Metadata = {
  title: "Auth Task App",
  description: "Next.js authentication task with React Query and Zustand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body style={{ fontFamily: "Vazir, sans-serif" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
