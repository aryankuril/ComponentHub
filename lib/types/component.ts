

export type ComponentType = 'frontend' | 'backend';

export type CodesType = {
  [key: string]: string; // nextjs, nodejs, laravel
};

export type ExtraFieldsType = {
  [key: string]: string[]; // framework-wise extra fields
};

export interface FrontendComponentData {
  _id: string;
  name: string;
  type: ComponentType;
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

export interface BackendComponentData {
  _id: string;
  name: string;
  description: string;
  type: ComponentType;
  code: CodesType;
  frameworks?: string[];
  extraFields?: ExtraFieldsType;
  category?: {
    _id?: string;
    name?: string;
  };
  dateCreated?: string;
}
