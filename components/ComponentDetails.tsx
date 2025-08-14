// components/ComponentDetails.tsx
'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import ComponentPreview from '@/components/ComponentPreview';
import CodeViewer from '@/components/CodeViewer';

interface ComponentData {
  _id: string;
  name: string;
  description: string;
  code: string;
  npmPackages: string[];
  category?: {
    name: string;
  };
}

// This is the new Client Component that handles the interactive UI.
export default function ComponentDetails({ component }: { component: ComponentData }) {
  const [activeTab, setActiveTab] = useState('preview');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200">
      <Navbar />
      <main className="flex-grow pt-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-4xl font-bold mb-2 text-blue-400">{component.name}</h1>
          <p className="text-gray-400 text-sm">Category: {component.category?.name || 'Uncategorized'}</p>
          <p className="mt-4 text-gray-300">{component.description}</p>

          <div className="mt-8">
            <div className="flex border-b border-gray-700">
              <button
                onClick={() => setActiveTab('preview')}
                className={`py-2 px-4 font-semibold text-sm transition-colors duration-200 ${
                  activeTab === 'preview' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                Live Preview
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`py-2 px-4 font-semibold text-sm transition-colors duration-200 ${
                  activeTab === 'code' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                Component Code
              </button>
            </div>

            <div className="mt-4">
              {activeTab === 'preview' && (
                <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
                  <ComponentPreview code={component.code} />
                </div>
              )}
              {activeTab === 'code' && (
                <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
                  <CodeViewer code={component.code} />
                </div>
              )}
            </div>
          </div>

          {component.npmPackages && component.npmPackages.length > 0 && (
            <div className="mt-8 p-4 bg-gray-800 border border-gray-700 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Required Packages</h3>
              <p className="text-gray-400 text-sm">Install with npm: `npm install {component.npmPackages.join(' ')}`</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
