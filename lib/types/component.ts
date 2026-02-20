export interface ComponentData {
  _id: string;
  name: string;
  description: string;
  code: string;
  npmPackages: string[];
  category?: {
    _id?: string;
    name?: string;
  };
  previewImage?: string;
  dateCreated?: string;
}
