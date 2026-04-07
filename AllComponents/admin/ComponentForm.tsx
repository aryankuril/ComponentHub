"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";

type ComponentType = "frontend" | "backend";

type CodesType = {
  [key: string]: string;
};

interface Category {
  _id: string;
  name: string;
}

interface InitialData {
  _id?: string;
  name: string;
  description: string;
  type: ComponentType;
  code: string | CodesType;
  frameworks?: string[];
  extraFields?: {
    [key: string]: string[];
  };
  npmPackages?: string[];
  category?: { _id: string };
  previewImage?: string;
}

interface Props {
  onSuccess: () => void;
  initialData?: InitialData | null;
}

const frameworksList = [
  { label: "Next Js", value: "nextjs" },
  { label: "Node Js", value: "nodejs" },
  { label: "Laravel", value: "laravel" },
];

export default function ComponentForm({
  onSuccess,
  initialData = null,
}: {
  onSuccess: () => void;
  initialData?: InitialData | null;
}) {
  // ================= STATE =================
  const [type, setType] = useState<ComponentType>("frontend");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [code, setCode] = useState("");
  const [codes, setCodes] = useState<CodesType>({});

  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);

  const [extraFields, setExtraFields] = useState<{
    [key: string]: string[];
  }>({});

  const [extraInput, setExtraInput] = useState<{
    [key: string]: string;
  }>({});

  const [npmPackages, setNpmPackages] = useState<string[]>([]);
  const [npmInput, setNpmInput] = useState("");

  const [previewImage, setPreviewImage] = useState<File | null>(null);

  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(false);

  // ================= FETCH CATEGORY =================
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data: Category[]) => setCategories(data));
  }, []);

  // ================= PREFILL (EDIT MODE) =================
  useEffect(() => {
    if (!initialData) return;

    setName(initialData.name);
    setDescription(initialData.description);
    setType(initialData.type);
    setExtraFields(initialData.extraFields || {});

    setNpmPackages(initialData.npmPackages || []);
    setSelectedFrameworks(initialData.frameworks || []);

    setCategory(initialData.category?._id || "");

    // 🔥 HANDLE CODE
    if (initialData.type === "frontend") {
      setCode(initialData.code as string);
    } else {
      setCodes(initialData.code as CodesType);
    }
  }, [initialData]);

  // ================= HELPERS =================
  const toggleFramework = (fw: string) => {
    setSelectedFrameworks((prev) =>
      prev.includes(fw) ? prev.filter((f) => f !== fw) : [...prev, fw]
    );
  };

  // ADD EXTRA FIELD
  const addExtraField = (fw: string) => {
    const value = (extraInput[fw] || "").trim();
    if (!value) return;

    setExtraFields((prev) => ({
      ...prev,
      [fw]: [...(prev[fw] || []), value],
    }));

    setExtraInput((prev) => ({
      ...prev,
      [fw]: "",
    }));
  };

  // REMOVE EXTRA FIELD
  const removeExtraField = (fw: string, val: string) => {
    setExtraFields((prev) => ({
      ...prev,
      [fw]: prev[fw].filter((v) => v !== val),
    }));
  };

  const addNpm = () => {
    const value = npmInput.trim();
    if (!value || npmPackages.includes(value)) return;

    setNpmPackages([...npmPackages, value]);
    setNpmInput("");
  };

  const removeNpm = (pkg: string) => {
    setNpmPackages(npmPackages.filter((p) => p !== pkg));
  };

  const handleCodeChange = (fw: string, value: string) => {
    setCodes((prev) => ({
      ...prev,
      [fw]: value,
    }));
  };

  const handleTypeChange = (newType: ComponentType) => {
    setType(newType);
    if (initialData) return; // don't reset if in edit mode

    // Reset all type-specific fields when switching types
    setCode("");
    setCodes({});
    setName("");
    setDescription("");
    setCategory("");
    setSelectedFrameworks([]);
    setExtraFields({});
    setExtraInput({});
    setNpmInput("");
    setNpmPackages([]);
    setPreviewImage(null);
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("type", type);
      formData.append("category", category);
      formData.append("extraFields", JSON.stringify(extraFields));
      formData.append("npmPackages", JSON.stringify(npmPackages));
      formData.append("frameworks", JSON.stringify(selectedFrameworks));

      if (type === "frontend") {
        formData.append("code", code);
      } else {
        formData.append("codes", JSON.stringify(codes));
      }

      if (type === "frontend" && previewImage) {
        formData.append("previewImage", previewImage);
      }

      const method = initialData ? "PUT" : "POST";
      const url = initialData
        ? `/api/components/${initialData._id}`
        : "/api/components";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (!res.ok) throw new Error("Failed");

      onSuccess();
    } catch (error) {
      console.error(error);
      alert("Error saving component");
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================
  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-black">
      {/** ================= TYPE TOGGLE ================= */}
      <div className="flex gap-6 mb-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            checked={type === "frontend"}
            onChange={() => handleTypeChange("frontend")}
          />
          Frontend
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            checked={type === "backend"}
            onChange={() => handleTypeChange("backend")}
          />
          Backend
        </label>
      </div>

      <div className="flex space-x-4">
        {/* ================= LEFT SIDE ================= */}
        <div className="flex-1 space-y-4">
          {/* NAME */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Component Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-white rounded-md border"
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 bg-white rounded-md border"
              required
            />
          </div>

          {/* NPM PACKAGES */}
          {type === "frontend" && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Required npm Packages
              </label>

              <div className="flex gap-2">
                <input
                  value={npmInput}
                  onChange={(e) => setNpmInput(e.target.value)}
                  className="flex-1 px-4 py-2 bg-white rounded-md border"
                />
                <button
                  type="button"
                  onClick={addNpm}
                  className="px-4 py-2 bg-[#F9B31B] rounded-md font-semibold"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {npmPackages.map((pkg) => (
                  <span
                    key={pkg}
                    className="px-3 py-1 bg-gray-200 text-sm rounded-full flex items-center gap-2"
                  >
                    {pkg}
                    <button
                      type="button"
                      onClick={() => removeNpm(pkg)}
                      className="text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* BACKEND EXTRA FIELDS */}
          {type === "backend" &&
            selectedFrameworks.map((fw) => (
              <div key={fw} className="mt-4">
                <label className="block text-sm font-medium mb-1">
                  {fw.toUpperCase()} Extra Fields (optional)
                </label>

                <div className="flex gap-2">
                  <input
                    value={extraInput[fw] || ""}
                    onChange={(e) =>
                      setExtraInput({
                        ...extraInput,
                        [fw]: e.target.value,
                      })
                    }
                    placeholder={`Add ${fw} extra field`}
                    className="flex-1 px-4 py-2 bg-white rounded-md border"
                  />

                  <button
                    type="button"
                    onClick={() => addExtraField(fw)}
                    className="px-4 py-2 bg-[#F9B31B] rounded-md font-semibold"
                  >
                    Add
                  </button>
                </div>

                {/* TAG LIST */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {(extraFields[fw] || []).map((field) => (
                    <span
                      key={field}
                      className="px-3 py-1 bg-blue-100 text-sm rounded-full flex items-center gap-2"
                    >
                      {field}
                      <button
                        type="button"
                        onClick={() => removeExtraField(fw, field)}
                        className="text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            ))}

          {/* PREVIEW IMAGE (ONLY FRONTEND) */}
          {type === "frontend" && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Preview Image (optional)
              </label>

              <input
                type="file"
                onChange={(e) => setPreviewImage(e.target.files?.[0] || null)}
                className="w-full px-4 py-2 bg-white rounded-md border"
              />
            </div>
          )}

          {/* BACKEND FRAMEWORKS */}
          {type === "backend" && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Select Framework(s)
              </label>

              <div className="flex gap-4">
                {frameworksList.map((fw: any, index: number) => (
                  <label key={index} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedFrameworks.includes(fw.value)}
                      onChange={() => toggleFramework(fw.value)}
                    />
                    {fw.label}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* CATEGORY */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 bg-white rounded-md border"
            >
              <option value="">-- Select Category --</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex-1 space-y-4">
          {/* FRONTEND CODE */}
          {type === "frontend" && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Component Code (Next.js + TailwindCSS)
              </label>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={15}
                className="font-mono w-full px-4 py-2 bg-white rounded-md border"
                required
              />
            </div>
          )}

          {/* BACKEND MULTI CODE */}
          {type === "backend" &&
            selectedFrameworks.map((fw) => (
              <div key={fw}>
                <label className="block text-sm font-medium mb-1">
                  {fw.toUpperCase()} Component Code
                </label>
                <textarea
                  value={codes ? codes[fw] || "" : ""}
                  onChange={(e) => handleCodeChange(fw, e.target.value)}
                  rows={8}
                  className="font-mono w-full px-4 py-2 bg-white rounded-md border"
                />
              </div>
            ))}
        </div>
      </div>

      {/* SUBMIT */}
      <div className="flex justify-between items-center mt-6">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#262626] text-[#F9B31B] px-6 py-2 rounded shadow"
        >
          {loading
            ? "Loading..."
            : initialData
            ? "Update Component"
            : "Publish Component"}
        </button>
      </div>
    </form>
  );
}
