import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers/Providers";


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
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
