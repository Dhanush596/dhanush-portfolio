import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/shared/SmoothScroll';
import { BackgroundModeProvider } from '@/components/canvas/BackgroundModeContext';
import { ClientShell } from '@/components/shared/ClientShell';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Dhanush A | Software Engineer & Cloud-Native Architect',
  description:
    'Full-stack developer and cloud-native engineer building production web applications and resilient delivery pipelines.',
  metadataBase: new URL('https://dhanush.dev'),
  openGraph: {
    title: 'Dhanush A | Software Engineer',
    description:
      'I build full-stack web apps and the cloud pipelines that ship them.',
    url: 'https://dhanush.dev',
    siteName: 'Dhanush A Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dhanush A | Software Engineer',
    description:
      'I build full-stack web apps and the cloud pipelines that ship them.',
  },
};

export const viewport: Viewport = {
  themeColor: '#F6F9FF',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  if (saved === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased selection:bg-[var(--accent)] selection:text-white">
        <BackgroundModeProvider>
          <SmoothScroll>
            <ClientShell>{children}</ClientShell>
          </SmoothScroll>
        </BackgroundModeProvider>
      </body>
    </html>
  );
}
