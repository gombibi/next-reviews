import { ReactNode } from "react";
import './globals.css';
import NavBar from '@/components/NavBar';
import { exo2, orbitron } from "./fonts";

export const metadata = {
  title: {
    default: 'Indie Gamer',
    template: '%s | Indie Gamer'
  },
  description: 'Only the best indie games, reviewed for you',
};

interface LayoutProps{
  children: ReactNode
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang='en' className={`${exo2.variable} ${orbitron.variable}`}>
      <body className='bg-orange-50 flex flex-col px-4 py-2 min-h-screen'>
        <header>
          <NavBar />
        </header>
        <main className='py-3'>{children}</main>
        <footer className='border-t py-3 text-center text-slate-500 text-xs'>
          Game data and images courtesy of{' '}
          <a href='http://rawg.io/' target='_blank'>
            RAWG
          </a>
          {' '} Deployed on Vercel
        </footer>
      </body>
    </html>
  );
}
