import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function getFirstComponent() {


  const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}` ||
  'http://localhost:3000';
  
const res = await fetch(`${baseUrl}/api/components`, {
  cache: 'no-store',
});

  if (!res.ok) {
    throw new Error('Failed to fetch components');
  }

  const components = await res.json();
  return components?.[0]?._id;
}

export default async function ComponentsRedirectPage() {
  const firstId = await getFirstComponent();

  if (firstId) {
    redirect(`/components/${firstId}`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      No components available
    </div>
  );
}