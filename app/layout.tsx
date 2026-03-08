import type { Metadata } from "next";
import "./globals.css";
import { Bebas_Neue, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from 'next-themes';
import { validateEnv } from '@/lib/env';
import QueryProvider from '@/components/QueryProvider';

validateEnv();

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "MoneyHana",
  description: "A savings and financial tracking app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebas.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <body className="font-jakarta antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <QueryProvider>
            {children}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
