'use client';

import { Eye, Copy, Calendar, Tag } from "lucide-react";
import Link from "next/link";
import { format } from 'date-fns';  // Import date-fns

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
    <div className="relative bg-gradient-card border border-border rounded-xl overflow-hidden h-full flex flex-col group transition-all duration-300">
      
      {/* Preview Image */}
      <div className="aspect-video bg-[#060606] relative overflow-hidden">
        {component.previewImage ? (
          <img
            src={component.previewImage}
            alt={component.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 bg-[#F9B31B] rounded-lg animate-pulse" />
          </div>
        )}
        {/*  */}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Preview Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={onPreview}
            className="bg-[#F9B31B] text-black px-4 py-2 rounded-md font-semibold transform scale-95 group-hover:scale-100 transition-transform duration-300 "
          >
            Preview
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-[#0b0b0b]">
        <div className="p-6 flex-1 flex flex-col bg-[#0b0b0b]">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold text-white group-hover:text-[#F9B31B] transition-colors duration-300">
              {component.name}
            </h3>
          </div>

          <p className="text-muted-foreground text-gray-400 text-sm mb-4 flex-1 line-clamp-2">
            {component.description}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Tag className="h-4 w-5 text-gray-400" />
              <span className="text-neon-purple">
                {component.category?.name || "Uncategorized"}
              </span>
            </div>
            {component.dateCreated && (
              <div className="flex items-center space-x-1 text-gray-400">
                <Calendar className="h-4 w-5 text-gray-400" />
                <span>{format(new Date(component.dateCreated), 'dd/MM/yyyy')}</span> {/* Fixed date format */}
              </div>
            )}
          </div>
        </div>

        {/* Glow effect */}
        <div className="absolute bg-[#0b0b0b] inset-0 rounded-xl opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />

        {/* View Component Link */}
        <div className="p-6 pt-0">
          <Link
            href={`/components/${component._id}`}
            className="block text-center mt-4 border-2 border-[#F9B31B] text-[#F9B31B] rounded-full px-4 py-2 font-semibold hover:bg-[#F9B31B] hover:text-black transition-all duration-300"
          >
            View Component
          </Link>
        </div>
      </div>
    </div>
  );
}
