'use client';
import { useState, useEffect } from 'react';

interface Category {
  _id: string;
  name: string;
}

export default function ManageCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editingCategoryName, setEditingCategoryName] = useState('');
  const [message, setMessage] = useState('');

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      if (!res.ok) {
        throw new Error('Failed to fetch categories.');
      }
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      setMessage(`Error: ${(error as Error).message}`);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName }),
      });
      if (res.ok) {
        setMessage('Category added successfully!');
        setNewCategoryName('');
        fetchCategories();
      } else {
        throw new Error('Failed to add category.');
      }
    } catch (error) {
      setMessage(`Error: ${(error as Error).message}`);
    }
  };

  const handleEditClick = (category: Category) => {
    setEditingCategoryId(category._id);
    setEditingCategoryName(category.name);
  };

  const handleUpdateCategory = async (id: string) => {
    setMessage('');
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editingCategoryName }),
      });
      if (res.ok) {
        setMessage('Category updated successfully!');
        setEditingCategoryId(null);
        setEditingCategoryName('');
        fetchCategories();
      } else {
        throw new Error('Failed to update category.');
      }
    } catch (error) {
      setMessage(`Error: ${(error as Error).message}`);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    setMessage('');
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        const res = await fetch(`/api/categories/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          setMessage('Category deleted successfully!');
          fetchCategories();
        } else {
          throw new Error('Failed to delete category.');
        }
      } catch (error) {
        setMessage(`Error: ${(error as Error).message}`);
      }
    }
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold mb-8">Manage Categories</h1>

      {message && <p className={`mb-4 text-center text-sm ${message.startsWith('Error') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}

      <div className="bg-gray-900 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add New Category</h2>
        <form onSubmit={handleAddCategory} className="flex space-x-4">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Category Name"
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 text-white"
            required
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-md transition-colors"
          >
            Add Category
          </button>
        </form>
      </div>

      <div className="bg-gray-900 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Existing Categories</h2>
        <ul className="space-y-4">
          {categories.map((category) => (
            <li key={category._id} className="flex justify-between items-center bg-gray-800 p-4 rounded-md">
              {editingCategoryId === category._id ? (
                <>
                  <input
                    type="text"
                    value={editingCategoryName}
                    onChange={(e) => setEditingCategoryName(e.target.value)}
                    className="flex-1 px-2 py-1 mr-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleUpdateCategory(category._id)}
                      className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingCategoryId(null)}
                      className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span className="font-medium">{category.name}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditClick(category)}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category._id)}
                      className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
