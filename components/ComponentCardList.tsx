// components/ComponentCardList.tsx
"use client";

import ComponentCard from "./ComponentCard";

interface ComponentType {
  _id: string;
  name: string;
  category?: { name?: string };
  description: string;
  dateCreated?: string;
  previewImage?: string;
}

interface ComponentCardListProps {
  components: ComponentType[];
}

export default function ComponentCardList({ components }: ComponentCardListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {components.map((component, index) => (
        <div
          key={String(component._id)}
          className="animate-slide-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <ComponentCard
            component={component}
            onPreview={() => console.log('Preview', component._id)}
            onCopy={() => console.log('Copy', component._id)}
          />
        </div>
      ))}
    </div>
  );
}
