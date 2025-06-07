import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "./context/LanguageContext";
import "./globals.css";

// Optimize font loading with display:swap to prevent CLS
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Mohamed Lotfi - CV",
  description: "Professional CV of Mohamed Lotfi",
  keywords: ["CV", "resume", "Mohamed Lotfi", "portfolio", "developer"],
};

// Optimize for mobile devices and Core Web Vitals
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f4f6" },
    { media: "(prefers-color-scheme: dark)", color: "#1f2937" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden scroll-smooth">
      <head>
        <link 
          rel="preload" 
          href="/profile.webp" 
          as="image" 
          type="image/webp" 
          fetchPriority="high" 
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LanguageProvider>
            <div className="relative overflow-x-hidden">
              {children}
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
