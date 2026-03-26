'use client'
import { useState } from 'react'
import { ClipboardIcon, CheckCircleIcon } from '@heroicons/react/24/solid'

export default function CodeViewer({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative bg-gray-800 rounded-lg overflow-hidden max-w-full">
      {/* Copy Button */}
      <button
        onClick={copyToClipboard}
        className="
          absolute top-2 right-2
          p-2
          rounded-md
          bg-gray-700 hover:bg-gray-600
          transition-colors
          z-10
        "
      >
        {copied ? (
          <CheckCircleIcon className="w-5 h-5 text-green-400" />
        ) : (
          <ClipboardIcon className="w-5 h-5 text-gray-300" />
        )}
      </button>

      {/* Code Block */}
      <pre
        className="
          p-3 md:p-4
          text-xs md:text-sm
          font-mono
          overflow-x-auto
          max-w-full
          min-w-0
          whitespace-pre-wrap
          break-words
        "
      >
        <code className="block max-w-full">{code}</code>
      </pre>
    </div>
  )
}
