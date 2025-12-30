export interface ComponentData {
  _id: string
  name: string
  description: string
  code: string
  npmPackages: string[]     // ALWAYS array (matches schema default)
  category?: {
    _id?: string
    name?: string
  }
  dateCreated?: string
}
