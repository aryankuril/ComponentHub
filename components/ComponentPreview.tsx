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
  // 🔥 Safety: prevent crash if code is empty or invalid
  if (!code || typeof code !== 'string') {
    return (
      <div className="w-full rounded-lg border border-gray-700 bg-gray-900 p-4 text-red-400">
        Invalid component code
      </div>
    );
  }

  // 🔥 Force a proper React default export wrapper
  const wrappedCode = `
import React from "react";

${code}

export default function App() {
  try {
    return <Component />;
  } catch (e) {
    return <div style={{color: "red"}}>Component render failed</div>;
  }
}
`;

  return (
    <div className="w-full rounded-lg border border-gray-700 bg-gray-900 p-4">
      <h2 className="mb-4 text-xl font-bold text-gray-200">
        Live Preview
      </h2>

      <SandpackProvider
        template="react"
        files={{
          "/App.js": {
            code: wrappedCode,
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
          externalResources: ["https://cdn.tailwindcss.com"],
        }}
      >
        <SandpackLayout>
          <SandpackPreview
            className="rounded-md bg-white"
            style={{ height: 500 }}
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
};

export default ComponentPreview;