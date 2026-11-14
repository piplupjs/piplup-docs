import './global.css';
import type { Metadata } from 'next';

import { Inter } from 'next/font/google';

import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { RootProvider } from 'fumadocs-ui/provider/next';

import { appDescription, appName, appTagline, domain, socialCardPath } from '@/lib/shared';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  applicationName: appName,
  authors: [{ name: 'Sadik Malik', url: 'https://github.com/sadik-malik' }],
  creator: appName,
  description: appDescription,
  keywords: [
    'react',
    'react-hook-form',
    'mui',
    'form adapters',
    'access control',
    'rbac',
    'permissions',
    'cache busting',
    'react hooks',
    'typescript',
  ],
  metadataBase: new URL(domain),
  openGraph: {
    description: appDescription,
    images: socialCardPath,
    locale: 'en_US',
    siteName: appName,
    title: `${appName} — ${appTagline}`,
    type: 'website',
    url: domain,
  },
  publisher: appName,
  robots: {
    follow: true,
    googleBot: { follow: true, index: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    index: true,
  },
  title: {
    default: `${appName} — ${appTagline}`,
    // Pages set a bare title; this keeps the brand in the tab and in results.
    template: `%s | ${appName}`,
  },
  twitter: {
    card: 'summary_large_image',
    description: appDescription,
    images: socialCardPath,
    title: `${appName} — ${appTagline}`,
  },
  // Set these in the deployment environment; nothing secret is committed.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : {},
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html className={inter.className} lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        <AppRouterCacheProvider>
          <RootProvider>{children}</RootProvider>
        </AppRouterCacheProvider>
        <Analytics />
        <SpeedInsights />
        {typeof process.env.NEXT_PUBLIC_GA_ID === 'string' && process.env.NEXT_PUBLIC_GA_ID ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        ) : null}
        {typeof process.env.NEXT_PUBLIC_GTM_ID === 'string' && process.env.NEXT_PUBLIC_GTM_ID ? (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        ) : null}
      </body>
    </html>
  );
}
