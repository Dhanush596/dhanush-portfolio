import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/shared/SmoothScroll';
import { ThemeSetter } from '@/components/shared/ThemeSetter';
import { PageTransition } from '@/components/shared/PageTransition';
import { Navbar } from '@/components/shared/Navbar';
import { BackgroundModeProvider } from '@/components/canvas/BackgroundModeContext';
import { TouchSensorWrapper } from '@/components/canvas/TouchSensorWrapper';
import { TouchHoldIndicator } from '@/components/shared/TouchHoldIndicator';
import { HeaderHUD } from '@/components/shared/HeaderHUD';

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
  title: 'Dhanush A | Software Engineer',
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
  themeColor: '#05060A',
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
      <body className="antialiased min-h-screen bg-black text-white selection:bg-white selection:text-black">
        <SmoothScroll>
          <BackgroundModeProvider>
            <ThemeSetter>
              {/* Full-screen 3D WebGL Touch & Wave Background */}
              <TouchSensorWrapper />

              {/* Interactive Telemetry Reticle & Coordinates HUD */}
              <TouchHoldIndicator />

              {/* Minimal Top Header HUD */}
              <HeaderHUD />

              {/* Main Page Content */}
              <div className="relative z-10 pt-14 pb-24">
                <PageTransition>{children}</PageTransition>
              </div>

              {/* Bottom Dock Navigation */}
              <Navbar />
            </ThemeSetter>
          </BackgroundModeProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
