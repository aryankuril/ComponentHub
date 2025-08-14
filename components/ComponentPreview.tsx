'use client';

import { useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

interface ComponentPreviewProps {
  code: string;
}

const ComponentPreview = ({ code }: ComponentPreviewProps) => {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-700 bg-gray-800 p-4">
      <h2 className="mb-4 text-xl font-bold text-gray-200">Live Preview</h2>
      <div
        className="w-full h-96 overflow-y-auto bg-white rounded-md p-4"
        dangerouslySetInnerHTML={{ __html: code }}
      />
    </div>
  );
};

export default ComponentPreview;

