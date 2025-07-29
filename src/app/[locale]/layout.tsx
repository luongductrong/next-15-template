import '@/app/globals.css';
import { clsx } from 'clsx';
import { cookies } from 'next/headers';
import { prefetchDNS } from 'react-dom';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { prefetchUrls } from '@/configs/prefetch';
import { setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { Geist, Geist_Mono, Montserrat } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export default async function AppLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Prefetch DNS for performance
  prefetchUrls.forEach((url) => {
    prefetchDNS(url);
  });

  const cookieStore = cookies();
  const theme = (await cookieStore).get('theme')?.value || 'light';
  return (
    <html
      lang={locale}
      className={clsx({
        dark: theme === 'dark',
      })}
    >
      <body className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'NotFoundPage' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

// Next.js will automatically generate static paths for each locale
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
