import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { LanguageProvider } from '@/components/layout/language-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { MotionProvider } from '@/components/layout/motion-provider';

// Plus Jakarta Sans: geometric like the Nexora wordmark, and designed in Jakarta.
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f4f6fb' },
    { media: '(prefers-color-scheme: dark)', color: '#050b1f' },
  ],
};

export const metadata: Metadata = {
  title: 'NexoraLabStudio — Jasa Pembuatan Website & Aplikasi Mobile',
  description: 'NexoraLabStudio builds websites, web apps and Android & iOS apps for businesses and startups — from idea to launch.',
  metadataBase: new URL('https://nexoralabstudio.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'NexoraLabStudio — Digital Product Development Studio',
    description: 'NexoraLabStudio builds modern Android apps, iOS apps, websites and custom digital products for businesses and startups.',
    url: 'https://nexoralabstudio.com',
    siteName: 'NexoraLabStudio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NexoraLabStudio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NexoraLabStudio — Digital Product Development Studio',
    description: 'NexoraLabStudio builds modern Android apps, iOS apps, websites and custom digital products for businesses and startups.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${jakarta.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <MotionProvider>
              <Navbar />
              <div className="flex-1">{children}</div>
              <Footer />
            </MotionProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
