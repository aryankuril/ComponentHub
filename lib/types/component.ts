

export type ComponentType = 'frontend' | 'backend';

// export type CodesType = {
//   [key: string]: string; // nextjs, nodejs, laravel
// };

export type ExtraFieldsType = {
  [key: string]: string[]; // framework-wise extra fields
};

export interface ComponentData {
  _id: string;
  name: string;
  description: string;
  type: ComponentType;

  // Code can be string (frontend) or CodesType (backend)
  code: any;

  // Frontend-specific
  npmPackages?: string[];
  previewImage?: string;

  // Backend-specific
  frameworks?: string[];
  extraFields?: ExtraFieldsType;

  // Shared optional
  category?: {
    _id?: string;
    name?: string;
  };

  dateCreated?: string;
}
