import dbConnect from '@/lib/mongodb';
import CategoryModel from '@/lib/schemas/Category';
import ComponentSidebar from './CategoriesSidebar';

// Define the interfaces for your data structures
interface ComponentType {
  _id: string;
  name: string;
  description: string;
}

interface CategoryType {
  _id: string;
  name: string;
  components?: ComponentType[];
}

export default async function CategoriesPage() {
  await dbConnect();

  // Fetch the data and assert its type
  const rawCategories = await CategoryModel.find({}).populate('components').lean();

  const categories: CategoryType[] = rawCategories.map((cat: any) => ({
    _id: cat._id.toString(),
    name: cat.name,
    components: (cat.components as any[])?.map((comp: any) => ({
      _id: comp._id.toString(),
      name: comp.name,
      description: comp.description,
    })) ?? [],
  }));

  return <ComponentSidebar initialCategories={categories} />;
}