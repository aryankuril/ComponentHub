'use client';

import { Calendar, Tag } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

interface ComponentCardProps {
  component: {
    _id: string;
    name: string;
    category?: { name?: string };
    description: string;
    dateCreated?: string;
    previewImage?: string;
  };
  onPreview: () => void;
  onCopy: () => void;
}





export default function ComponentCard({ component, onPreview, onCopy }: ComponentCardProps) {
  return (
    <div className="relative bg-gradient-card rounded-xl overflow-hidden flex flex-col transition-all duration-300 h-full">

      {/* Image Section */}
    <div
  className="w-full h-[150px] bg-[#060606] bg-no-repeat"
  style={{
    backgroundImage: `url(${component.previewImage})`,
    backgroundSize: "100% 100%"
  }}
></div>





      {/* Content Section */}
      <div className="bg-[#0b0b0b] flex flex-col flex-1">
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold white-text capitalize mb-4 line-clamp-2">
            {component.name}
          </h3>

          <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
            <div className="flex items-center space-x-1">
              <Tag className="h-4 w-5 grey-text" />
              <span className="text-neon-purple capitalize">
                {component.category?.name || "Uncategorized"}
              </span>
            </div>

            {component.dateCreated && (
              <div className="flex items-center space-x-1 grey-text">
                <Calendar className="h-4 w-5 grey-text" />
                <span>{format(new Date(component.dateCreated), "dd/MM/yyyy")}</span>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 pt-0">
          <Link
            href={`/components/${component._id}`}
            className="block text-center mt-4 border-2 border-[#F9B31B] text-primary rounded-full px-4 py-2 font-semibold 
                     hover:bg-[#F9B31B] hover:!text-black transition-all duration-300"
          >
            View Component
          </Link>
        </div>
      </div>

    </div>
  );
}
