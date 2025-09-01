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

// Raw Mongoose output (loosely typed)
interface RawComponent {
  _id: string;
  name?: string;
  description?: string;
}

interface RawCategory {
  _id: string;
  name?: string;
  components?: RawComponent[];
}

export default async function CategoriesPage() {
  await dbConnect();

  // Fetch the data from MongoDB
  const rawCategories = await CategoryModel.find({}).populate('components').lean();

  // Map to our typed structure safely
  const categories: CategoryType[] = (rawCategories as unknown as RawCategory[]).map((cat) => ({
    _id: cat._id.toString(),
    name: cat.name ?? 'Unnamed Category',
    components: cat.components?.map((comp) => ({
      _id: comp._id.toString(),
      name: comp.name ?? 'Unnamed Component',
      description: comp.description ?? '',
    })) ?? [],
  }));

  return <ComponentSidebar initialCategories={categories} />;
}
