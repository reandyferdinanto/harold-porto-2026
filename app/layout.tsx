import type { Metadata } from 'next';
import Image from 'next/image';
import './globals.css';
import { siteConfig } from '@/data/portfolio';

export const metadata: Metadata = {
  title: `${siteConfig.name}'s Portfolio`,
  description: siteConfig.tagline,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Viewport with safe-area support for notched phones */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="stylesheet" href="https://cdn.linearicons.com/free/1.0.0/icon-font.min.css" />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
          integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
          crossOrigin="anonymous"
        />
      </head>
      <body suppressHydrationWarning>
        {/* ── Fixed full-page background ── */}
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          backgroundColor: '#050505',
        }}>
          <Image
            src="/img/black%20bg-02.png"
            alt=""
            fill
            priority
            quality={80}
            style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.55 }}
          />
          {/* Dark overlay so glass cards are always readable */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(0,0,0,0.70) 0%, rgba(10,5,0,0.65) 50%, rgba(0,0,0,0.75) 100%)',
          }} />
          {/* Subtle orange radial glow — top-right */}
          <div style={{
            position: 'absolute',
            top: '-10%',
            right: '-5%',
            width: '50vw',
            height: '50vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          {/* Subtle orange radial glow — bottom-left */}
          <div style={{
            position: 'absolute',
            bottom: '-10%',
            left: '-5%',
            width: '40vw',
            height: '40vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
        </div>

        {/* ── Page content ── */}
        <div style={{ position: 'relative', zIndex: 0 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
