// types/category.ts
export interface ComponentType {
  _id: string;
  name: string;
  description: string;
}

export interface CategoryType {
  _id: string;
  name: string;
  components: ComponentType[];
}
