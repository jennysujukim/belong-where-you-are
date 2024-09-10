import type { Metadata } from "next";
import { Hanken_Grotesk } from 'next/font/google';
import "./globals.css";


export const metadata: Metadata = {
  title: "Belong Where You Are - Photo Album created by Jenny Kim",
  description: "Photos taken by Jenny Kim with Fujifilm Quicksnap.",
};

const hankenGrotesk = Hanken_Grotesk({ 
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-hankenGrotesk',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${hankenGrotesk.variable}`}>
        {children}
      </body>
    </html>
  );
}
