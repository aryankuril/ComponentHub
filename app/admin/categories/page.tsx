'use client';
import { Edit, Trash } from 'lucide-react';
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
       const data: Category[] = await res.json(); 
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
    <div className="p-8  white-text ">
      <h1 className="text-4xl font-bold mb-8 text-black">Manage Categories</h1>

      {message && <p className={`mb-4 text-center text-sm ${message.startsWith('Error') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}

      <div className="bg-white/50 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-black">Add New Category</h2>
        <form onSubmit={handleAddCategory} className="flex space-x-4">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Category Name"
            className="flex-1 px-4 py-2 bg-white rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 text-gray-900"
            required
          />
          <button
            type="submit"
             className="rounded-[5px] bg-[#262626] shadow-[2px_2px_0px_0px_#F9B31B] flex justify-center items-center gap-[10px] px-[30px] py-[10px] text-[#F9B31B] font-semibold transition-colors w-full sm:w-auto"
          >
            Add Category
          </button>
        </form>
      </div>

      <div className="bg-white/50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-black">Existing Categories</h2>
        <ul className="space-y-4">
          {categories.map((category) => (
            <li key={category._id} className="flex justify-between items-center bg-white text-black p-4 rounded-md">
              {editingCategoryId === category._id ? (
                <>
                  <input
                    type="text"
                    value={editingCategoryName}
                    onChange={(e) => setEditingCategoryName(e.target.value)}
                    className="flex-1 px-2 py-1 mr-2 bg-white/50 border border-gray-600 rounded-md text-black"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleUpdateCategory(category._id)}
                      className="rounded-[5px] bg-[#262626] shadow-[2px_2px_0px_0px_#F9B31B] flex justify-center items-center gap-[10px] px-[18px] py-[8px] text-[#F9B31B] font-semibold transition-colors w-full sm:w-auto"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingCategoryId(null)}
                     className="rounded-[5px] bg-[#F9B31B] shadow-[2px_2px_0_0_#262626] flex justify-center items-center gap-[10px] px-[18px] py-[8px] text-[#262626] font-semibold transition-colors w-full sm:w-auto"
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
                        className="p-2 rounded-lg text-[#FFD54F] hover:bg-gray-300 transition-colors"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category._id)}
                      className="p-2 rounded-lg text-red-600 hover:bg-gray-300 transition-colors"
                    >
                      <Trash size={18} />
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
