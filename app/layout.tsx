import type { Metadata } from "next";
import "./globals.css";
import { Bebas_Neue, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from 'next-themes';

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
    // suppressHydrationWarning is required here because next-themes injects
    // the theme class on the client after SSR, causing a mismatch on <html>.
    // This is the officially recommended fix from the next-themes docs.
    <html lang="en" className={`${bebas.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <body className="font-jakarta antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}