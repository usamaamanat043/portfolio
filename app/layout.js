import { Bricolage_Grotesque, IBM_Plex_Sans } from 'next/font/google';
import './globals.css';
import { Providers } from '../components/motion';

const display = Bricolage_Grotesque({ subsets: ['latin'], weight: ['500', '700', '800'], variable: '--font-display' });
const body = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-body' });

export const metadata = {
  title: 'Usama Amanat – Software Engineer',
  description: 'Full-stack software engineer building AI and data products with Python, .NET, and React.',
};
export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body><Providers>{children}</Providers></body>
    </html>
  );
}
