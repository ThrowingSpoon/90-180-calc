import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import './globals.css';
import Providers from './providers';
import { cn } from '@/lib/utils';
import Nav from '@/components/Nav';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: '90-180 Calc',
  description: '90-180 Calculator',
};

const inter = Inter({ subsets: ['latin'] });

export const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn(
        'flex flex-col h-screen bg-background font-sans antialiased z-50',
        fontSans.variable,
        inter.className,
      )}
      >
        <Providers>
          <div className="flex m-4">
            <Nav />
          </div>
          <div className="mx-auto w-full md:w-9/12 lg:w-7/12">
            {children}
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
