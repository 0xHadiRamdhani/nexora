import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
};

export const metadata: Metadata = {
  title: 'NexoraLabStudio — Digital Product Development Studio',
  description: 'NexoraLabStudio builds modern Android apps, iOS apps, websites and custom digital products for businesses and startups.',
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
        className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
