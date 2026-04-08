"use client";

import { useState, useEffect } from "react";
import { ComponentData } from "@/lib/types/component";
import ComponentPreview from "@/AllComponents/ComponentPreview";
import CodeViewer from "@/AllComponents/CodeViewer";
import { ClipboardIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

export default function BackendComponentDetails({
  component,
}: {
  component: ComponentData;
}) {
  // const [activeTab, setActiveTab] = useState('preview')
  const [activeFramework, setActiveFramework] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);

  // 🔹 package manager tab
  // const [pkgManager, setPkgManager] =
  //   useState<'pnpm' | 'npm' | 'yarn' | 'bun'>('npm')

  // 🔹 copy state (SAME AS CodeViewer)
  const [copied, setCopied] = useState({ id: "", done: false });

  useEffect(() => {
    setIsMounted(true);
    if (component.frameworks?.length) {
      setActiveFramework(component.frameworks[0]);
    }
  }, [component]);

  if (!isMounted) return null;

  // const packages = component.npmPackages?.join(' ') || ''

  // const commands = {
  //   pnpm: `pnpm add ${packages}`,
  //   npm: `npm install ${packages}`,
  //   yarn: `yarn add ${packages}`,
  //   bun: `bun add ${packages}`,
  // }

  const currentCode =
    typeof component.code === "object"
      ? component.code[activeFramework] || ""
      : "";

  const copyToClipboard = (value: string, id: string) => {
    navigator.clipboard.writeText(value);
    setCopied({ id, done: true });
    setTimeout(() => setCopied({ id: "", done: false }), 2000);
  };

  return (
    <div className="min-h-screen container flex flex-col  text-gray-200 mt-10">
      <main className="flex-grow px-4 ">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-4xl font-bold mb-2 text-[#F9B31B] capitalize">
            {component.name}
          </h1>

          <p className=" black-text text-sm capitalize">
            Category: {component.category?.name || "Uncategorized"}
          </p>

          <div className="mt-8">
            <div className="flex border-b border-gray-700 ">
              {component.frameworks?.map((fw) => (
                <button
                  key={fw}
                  onClick={() => setActiveFramework(fw)}
                  className={`py-2 px-4 text-sm font-semibold capitalize ${
                    activeFramework === fw
                      ? "border-b-2 border-[#F9B31B] text-[#F9B31B]"
                      : "black-text hover:text-gray-300 cursor-pointer"
                  }`}
                >
                  {fw}
                </button>
              ))}
            </div>
            {/* ================= CODE BOX ================= */}
            <div className="mt-4 space-y-6">
              {/* ================= EXTRA FIELDS ================= */}
              {component.extraFields &&
                component.extraFields[activeFramework]?.length > 0 && (
                  <div className="mt-8 bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
                    <h3 className="text-xl font-bold px-4 pt-4 pb-2 capitalize">
                      {activeFramework} Required Actions
                    </h3>

                    {component.extraFields[activeFramework].map((field) => (
                      <div className="relative mt-3 mx-4 mb-4 bg-gray-800 rounded-lg px-4 py-3 font-mono text-sm text-gray-100">
                        {field}
                        {/* COPY BUTTON */}
                        <button
                          onClick={() => {
                            copyToClipboard(field, field);
                          }}
                          className="absolute top-2 right-2 p-1 cursor-pointer rounded-md bg-gray-700 hover:bg-gray-600 transition-colors"
                          title="Copy"
                        >
                          {copied.id === field && copied.done ? (
                            <CheckCircleIcon className="w-5 h-5 text-green-400" />
                          ) : (
                            <ClipboardIcon className="w-5 h-5 text-gray-300" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
                <CodeViewer code={currentCode} />
              </div>
            </div>
          </div>

          <div className="mt-6 bg-gray-900 border border-gray-700 rounded-xl p-5">
            <h3 className="text-xl font-bold  pb-2">Description</h3>

            <p className="text-gray-300 text-sm leading-relaxed max-w-3xl whitespace-pre-wrap">
              {component.description}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
