import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ViewportScaler from "./components/ViewportScaler";
import AuthGuard from "./components/AuthGuard";
import ResourceDiagnostics from "./components/ResourceDiagnostics";

// Importing Cinzel font from Google Fonts
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Odyssey game",
  description: "¿Qué dios romano te representa?",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} font-cinzel`}>
        <ResourceDiagnostics />
        <ViewportScaler><AuthGuard>{children}</AuthGuard></ViewportScaler>
      </body>
    </html>
  );
}
