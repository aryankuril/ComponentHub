// components/admin/ComponentPreview.tsx
import React from 'react';

export default function ComponentPreview({ code }: { code: string }) {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Preview</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          html, body { 
            background-color: #000; 
            color: #fff; 
            font-family: ui-sans-serif, system-ui, sans-serif;
            margin: 0;
            padding: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100%;
          }
        </style>
    </head>
    <body>
        ${code}
    </body>
    </html>
  `;

  return (
    <div className="flex flex-col items-center">
      <p className="text-sm font-medium  grey-text  mb-2">Live Preview</p>
      <iframe
        className="w-80 h-48 border border-gray-700 rounded-md bg-black"
        sandbox="allow-scripts"
        srcDoc={htmlContent}
        title="Component Live Preview"
      />
    </div>
  );
}