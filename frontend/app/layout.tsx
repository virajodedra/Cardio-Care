import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter as a default clean font
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Background } from "@/components/ui/background";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CardioCare | Heart Disease Prediction",
  description: "AI-powered cardiovascular disease risk assessment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Background />
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
