"use client";

import { useState, useEffect, ReactNode } from "react";
import ComponentPreview from "@/components/admin/ComponentPreview";

interface Category {
  _id: string;
  name: string;
}

interface ComponentFormData {
  _id?: string;
  name: string;
  description: string;
  code: string;
  npmPackages?: string[];
  category?: { _id: string };
}

export default function ComponentForm({
  onSuccess,
  initialData = null,
}: {
  onSuccess: () => void;
  initialData?: ComponentFormData | null;
}) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [code, setCode] = useState(initialData?.code || "");
  const [npmPackages, setNpmPackages] = useState(initialData?.npmPackages?.join(", ") || "");
  const [categoryId, setCategoryId] = useState(initialData?.category?._id || "");
  const [categories, setCategories] = useState<Category[]>([]);
  const [messageElement, setMessageElement] = useState<ReactNode>("");

  const setMessage = (msg: string, isSuccess = false) => {
    const color = isSuccess ? "text-green-500" : "text-red-500";
    setMessageElement(<p className={`text-sm text-center ${color}`}>{msg}</p>);
  };

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then(setCategories);

    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setCode(initialData.code);
      setNpmPackages(initialData.npmPackages?.join(", ") || "");
      setCategoryId(initialData.category?._id || "");
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessageElement(""); // Clear previous messages

    const method = initialData ? "PATCH" : "POST";
    const url = initialData ? `/api/components/${initialData._id}` : "/api/components";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          code,
          npmPackages: npmPackages.split(",").map((p) => p.trim()),
          category: categoryId || null,
        }),
      });

      if (res.ok) {
        setMessage("Component saved successfully!", true);
        onSuccess();

        if (!initialData) {
          setName("");
          setDescription("");
          setCode("");
          setNpmPackages("");
          setCategoryId("");
        }
      } else {
        const errorData = await res.json();
        setMessage(`Failed to save component: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`An unexpected error occurred: ${error.message}`);
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {messageElement}
      <div className="flex space-x-4">
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Component Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 rounded-md border border-gray-700"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 bg-gray-800 rounded-md border border-gray-700"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Required npm Packages (comma-separated)
            </label>
            <input
              type="text"
              value={npmPackages}
              onChange={(e) => setNpmPackages(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 rounded-md border border-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category (Optional)</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 rounded-md border border-gray-700"
            >
              <option value="">-- No Category --</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex-1">
          <div>
            <label className="block text-sm font-medium mb-1">
              Component Code (Next.js + TailwindCSS)
            </label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={15}
              className="font-mono w-full px-4 py-2 bg-gray-800 rounded-md border border-gray-700"
              required
            ></textarea>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-6">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-md transition-colors"
        >
          {initialData ? "Update Component" : "Publish Component"}
        </button>
        <ComponentPreview code={code} />
      </div>
    </form>
  );
}
