'use client';

import { useState, useEffect, ReactNode } from 'react';
import ComponentPreview from '@/components/admin/ComponentPreview';

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
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');

  // 🔹 npm packages (MULTI)
  const [npmPackages, setNpmPackages] = useState<string[]>([]);
  const [npmInput, setNpmInput] = useState('');

  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [messageElement, setMessageElement] = useState<ReactNode>('');

  const setMessage = (msg: string, isSuccess = false) => {
    const color = isSuccess ? 'text-green-500' : 'text-red-500';
    setMessageElement(<p className={`text-sm text-center ${color}`}>{msg}</p>);
  };

  // 🔹 RESET FORM
  const resetForm = () => {
    setName('');
    setDescription('');
    setCode('');
    setNpmPackages([]);
    setNpmInput('');
    setCategoryId('');
  };

  // 🔹 ADD / REMOVE npm PACKAGES
  const addNpmPackage = () => {
    const value = npmInput.trim();
    if (!value || npmPackages.includes(value)) return;

    setNpmPackages([...npmPackages, value]);
    setNpmInput('');
  };

  const removeNpmPackage = (pkg: string) => {
    setNpmPackages(npmPackages.filter((p) => p !== pkg));
  };

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setDescription(initialData.description || '');
      setCode(initialData.code || '');
      setNpmPackages(initialData.npmPackages || []);
      setCategoryId(initialData.category?._id || '');
    } else {
      resetForm();
    }
    setMessageElement('');
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessageElement('');

    const method = initialData ? 'PATCH' : 'POST';
    const url = initialData
      ? `/api/components/${initialData._id}`
      : '/api/components';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description,
          code,
          npmPackages,
          category: categoryId,
        }),
      });

      if (res.ok) {
        setMessage('Component saved successfully!', true);
        resetForm();
        onSuccess();
      } else {
        const errorData = await res.json();
        setMessage(`Failed to save component: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      setMessage('An unexpected error occurred.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-black">
      {messageElement}

      <div className="flex space-x-4">
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Component Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-white rounded-md border"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 bg-white rounded-md border"
              required
            />
          </div>

          {/* 🔹 MULTI npm INPUT */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Required npm Packages
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                value={npmInput}
                onChange={(e) => setNpmInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addNpmPackage();
                  }
                }}
                placeholder="e.g. framer-motion"
                className="flex-1 px-4 py-2 bg-white rounded-md border border-gray-700"
              />

              <button
                type="button"
                onClick={addNpmPackage}
                className="px-4 py-2 bg-[#F9B31B] text-black rounded-md font-semibold"
              >
                Add
              </button>
            </div>

            {npmPackages.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {npmPackages.map((pkg) => (
                  <span
                    key={pkg}
                    className="px-3 py-1 bg-gray-200 text-sm rounded-full flex items-center gap-2"
                  >
                    {pkg}
                    <button
                      type="button"
                      onClick={() => removeNpmPackage(pkg)}
                      className="text-red-500 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-4 py-2 bg-white rounded-md border border-gray-700"
              required
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">
            Component Code (Next.js + TailwindCSS)
          </label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={15}
            className="font-mono w-full px-4 py-2 bg-white rounded-md border border-gray-700"
            required
          />
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          type="submit"
          className={`rounded-[5px] flex justify-center items-center gap-[10px] px-[30px] py-[10px] font-semibold transition-colors w-full sm:w-auto
            ${
              initialData
                ? 'bg-[#F9B31B] shadow-[2px_2px_0px_0px_#262626] text-[#262626]'
                : 'bg-[#262626] shadow-[2px_2px_0px_0px_#F9B31B] text-[#F9B31B]'
            }`}
        >
          {initialData ? 'Update Component' : 'Publish Component'}
        </button>

        <ComponentPreview code={code} />
      </div>
    </form>
  );
}
