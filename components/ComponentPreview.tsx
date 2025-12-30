'use client';

import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
} from '@codesandbox/sandpack-react';

interface ComponentPreviewProps {
  code: string;
}

const ComponentPreview = ({ code }: ComponentPreviewProps) => {
  return (
    <div className="w-full rounded-lg border border-gray-700 bg-gray-900 p-4">
      <h2 className="mb-4 text-xl font-bold text-gray-200">
        Live Preview
      </h2>

      <SandpackProvider
        template="react"
        files={{
          '/App.js': {
            code,
            active: true,
          },
        }}
        customSetup={{
          dependencies: {
            "react-slick": "^0.30.2",
            "slick-carousel": "^1.8.1",
            "framer-motion": "^10.16.4",
          },
        }}
        options={{
          externalResources: [
            "https://cdn.tailwindcss.com",
          ],
        }}
      >
        <SandpackLayout>
          <SandpackPreview
            style={{ height: 500 }}
            className="rounded-md bg-white"
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
};

export default ComponentPreview;
