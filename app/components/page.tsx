import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function getFirstComponent() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/components`,
    { cache: 'no-store' }
  );

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