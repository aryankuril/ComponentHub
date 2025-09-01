import dbConnect from '@/lib/mongodb';
import Category from '@/lib/schemas/Category';
import ComponentSidebar from './CategoriesSidebar';

export default async function CategoriesPage() {
  await dbConnect();

  const rawCategories = await Category.find({}).populate('components').lean();

  const categories = rawCategories.map((cat: any) => ({
    _id: cat._id.toString(),
    name: cat.name,
    components: cat.components?.map((comp: any) => ({
      _id: comp._id.toString(),
      name: comp.name,
      description: comp.description,
    })) ?? [],
  }));

  return <ComponentSidebar initialCategories={categories} />;
}
