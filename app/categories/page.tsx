import dbConnect from '@/lib/mongodb';
import CategoryModel from '@/lib/schemas/Category';
import CategoriesSidebar, { CategoryType, ComponentType } from './CategoriesSidebar';

// Raw MongoDB data types
interface RawComponent {
  _id: any;
  name?: string;
  description?: string;
  code?: string;
  npmPackages?: string[];
}

interface RawCategory {
  _id: any;
  name?: string;
  components?: RawComponent[];
}

export default async function CategoriesPage() {
  await dbConnect();

  // Fetch all categories with populated components
  const rawCategories = await CategoryModel.find({}).populate('components').lean();

  // Map raw data to strongly typed structure
  const categories: CategoryType[] = (rawCategories as unknown as RawCategory[]).map((cat) => ({
    _id: cat._id.toString(),
    name: cat.name ?? 'Unnamed Category',
    components: cat.components?.map((comp) => ({
  _id: comp._id.toString(),
  name: comp.name ?? 'Unnamed Component',
  description: comp.description ?? '',
  code: comp.code ?? '',
  npmPackages: comp.npmPackages ?? [],
})) ?? [],

  }));

  return <CategoriesSidebar initialCategories={categories} />;
}
