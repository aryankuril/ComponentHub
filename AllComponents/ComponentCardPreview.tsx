'use client'

import {
  SandpackProvider,
  SandpackPreview,
} from '@codesandbox/sandpack-react'

interface ComponentCardPreviewProps {
  code: string
}

export default function ComponentCardPreview({ code }: ComponentCardPreviewProps) {
  return (
    <div className="absolute inset-0 bg-white overflow-hidden flex justify-center">
      {/* Fake card viewport */}
      <div className="w-[500%] h-full scale-[0.65] origin-top ">
        <SandpackProvider
          template="react"
          files={{
            '/App.js': { code, active: true },
          }}
          options={{
            externalResources: ['https://cdn.tailwindcss.com'],
          }}
        >
          <SandpackPreview
            showOpenInCodeSandbox={false}
            showRefreshButton={false}
            className="
              w-full
              h-[600px]
              overflow-hidden
              [&_*]:overflow-hidden
            "
          />
        </SandpackProvider>
      </div>
    </div>
  )
}
