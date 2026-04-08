"use client";

import { useState, useEffect } from "react";
import { ComponentData } from "@/lib/types/component";
import ComponentPreview from "@/AllComponents/ComponentPreview";
import CodeViewer from "@/AllComponents/CodeViewer";
import { ClipboardIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

export default function ComponentDetails({
  component,
}: {
  component: ComponentData;
}) {
  const [activeTab, setActiveTab] = useState("preview");
  const [isMounted, setIsMounted] = useState(false);

  // 🔹 package manager tab
  const [pkgManager, setPkgManager] = useState<"pnpm" | "npm" | "yarn" | "bun">(
    "npm"
  );

  // 🔹 copy state (SAME AS CodeViewer)
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const packages = component.npmPackages?.join(" ") || "";

  const commands = {
    pnpm: `pnpm add ${packages}`,
    npm: `npm install ${packages}`,
    yarn: `yarn add ${packages}`,
    bun: `bun add ${packages}`,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(commands[pkgManager]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
              <button
                onClick={() => setActiveTab("preview")}
                className={`py-2 px-4 font-semibold text-sm transition-colors duration-200 cursor-pointer ${
                  activeTab === "preview"
                    ? "border-b-2 border-[#F9B31B] text-[#F9B31B]"
                    : " black-text hover:text-gray-300 cursor-pointer "
                }`}
              >
                Live Preview
              </button>
              <button
                onClick={() => setActiveTab("code")}
                className={`py-2 px-4 font-semibold text-sm transition-colors duration-200 cursor-pointer ${
                  activeTab === "code"
                    ? "border-b-2 border-[#F9B31B] text-[#F9B31B]"
                    : " black-text hover:text-gray-300 cursor-pointer "
                }`}
              >
                Component Code
              </button>
            </div>

            <div className="mt-4">
              {activeTab === "preview" && (
                <div className="rounded-lg">
                  <ComponentPreview code={component?.code || ""} />
                </div>
              )}

              {activeTab === "code" && (
                <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
                  <CodeViewer code={component?.code || ""} />
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 bg-gray-900 border border-gray-700 rounded-xl p-5">
            <h3 className="text-xl font-bold  pb-2">Description</h3>

            <p className="text-gray-300 text-sm leading-relaxed max-w-3xl">
              {component.description}
            </p>
          </div>

          {/* 🔥 REQUIRED PACKAGES (WITH COPY ICON LIKE CODEVIEWER) */}
          {component.npmPackages && component.npmPackages.length > 0 && (
            <div className="mt-8 bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
              <h3 className="text-xl font-bold px-4 pt-4 pb-2">
                Required Packages
              </h3>

              {/* Tabs */}
              <div className="flex gap-2 px-4 pt-2">
                {(["pnpm", "npm", "yarn", "bun"] as const).map((tool) => (
                  <button
                    key={tool}
                    onClick={() => {
                      setPkgManager(tool);
                      setCopied(false);
                    }}
                    className={`px-3 py-1 text-sm rounded-full border transition cursor-pointer ${
                      pkgManager === tool
                        ? "bg-gray-800 border-gray-600 text-white"
                        : "border-transparent text-gray-400 hover:text-white cursor-pointer"
                    }`}
                  >
                    {tool}
                  </button>
                ))}
              </div>

              {/* Command box */}
              <div className="relative mt-3 mx-4 mb-4 bg-gray-800 rounded-lg px-4 py-3 font-mono text-sm text-gray-100">
                {commands[pkgManager]}

                {/* Copy Button (SAME UX AS CODEVIEWER) */}
                <button
                  onClick={copyToClipboard}
                  className="absolute top-2 right-2 p-1 cursor-pointer rounded-md bg-gray-700 hover:bg-gray-600 transition-colors"
                >
                  {copied ? (
                    <CheckCircleIcon className="w-5 h-5 text-green-400" />
                  ) : (
                    <ClipboardIcon className="w-5 h-5 text-gray-300" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
