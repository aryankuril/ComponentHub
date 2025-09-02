// app/components/[id]/page.tsx
import dbConnect from '@/lib/mongodb';
import Component from '@/lib/schemas/Component';
import Category from '@/lib/schemas/Category';
import ComponentDetails from '@/components/ComponentDetails';

// Server Component
export default async function ComponentPage({
  params,
}: {
  params: { id: string };
}) {
  await dbConnect();
  Category.modelName; // ensure model is registered

  const component = await Component.findById(params.id).populate('category').lean();

  if (!component) {
    return (
      <div className="text-center mt-20 text-red-500">
        <h1 className="text-2xl font-bold">Component not found.</h1>
      </div>
    );
  }

  const serializedComponent = JSON.parse(JSON.stringify(component));

  return <ComponentDetails component={serializedComponent} />;
}
