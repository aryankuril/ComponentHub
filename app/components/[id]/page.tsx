// app/components/[id]/page.tsx
import dbConnect from '@/lib/mongodb';
import Component from '@/lib/schemas/Component';
import Category from '@/lib/schemas/Category';
import ComponentDetails from '@/components/ComponentDetails';

// This is now a Server Component and will handle all the database logic.
export default async function ComponentPage({ params }: { params: { id: string } }) {
  await dbConnect();
  // We explicitly touch the Category model to ensure it's registered.
  Category.modelName;

  const component = await Component.findById(params.id).populate('category').lean();

  if (!component) {
    return (
      <div className="text-center mt-20 text-red-500">
        <h1 className="text-2xl font-bold">Component not found.</h1>
      </div>
    );
  }

  // The component data is serialized and passed as a prop to the Client Component.
  const serializedComponent = JSON.parse(JSON.stringify(component));

  return <ComponentDetails component={serializedComponent} />;
}
