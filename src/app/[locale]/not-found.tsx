import { getTranslations } from 'next-intl/server';

export default async function NotFoundPage() {
  const t = await getTranslations('NotFoundPage');

  return (
    <main className="font-montserrat flex items-center justify-center min-h-screen p-4 bg-black text-white">
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-bold pr-5 mr-5 border-r border-white">404</h1>
        <h2 className="text-sm">{t('description')}</h2>
      </div>
    </main>
  );
}
