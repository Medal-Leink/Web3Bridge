import React, { useState } from 'react';

type CategoryType = 'income' | 'expense';

interface CategoryManagerProps {
  categories: Record<CategoryType, string[]>;
  setCategories: (categories: Record<CategoryType, string[]>) => void;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({ categories, setCategories }) => {
  const [type, setType] = useState<CategoryType>('income');
  const [newCategory, setNewCategory] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const handleAdd = () => {
    if (!newCategory.trim()) return;
    const updated = [...categories[type], newCategory.trim()];
    setCategories({ ...categories, [type]: updated });
    setNewCategory('');
  };

  const handleDelete = (index: number) => {
    const updated = [...categories[type]];
    updated.splice(index, 1);
    setCategories({ ...categories, [type]: updated });
  };

  const handleEdit = (index: number) => {
    const updated = [...categories[type]];
    if (!editText.trim()) return;
    updated[index] = editText.trim();
    setCategories({ ...categories, [type]: updated });
    setEditIndex(null);
    setEditText('');
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow rounded">
      <h2 className="text-lg font-semibold mb-3">Manage Categories</h2>

      <div className="flex gap-2 mb-4">
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value as CategoryType);
            setEditIndex(null);
            setEditText('');
          }}
          className="p-2 border rounded w-1/2"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input
          type="text"
          placeholder={`New ${type} category`}
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="p-2 border rounded flex-grow"
        />
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-3 rounded hover:bg-green-700"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {categories[type].map((cat, index) => (
          <li key={index} className="flex items-center justify-between border-b pb-1">
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="border p-1 rounded w-1/2"
                />
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-blue-600 hover:underline"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditIndex(null)}
                    className="text-gray-500 hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <span>{cat}</span>
                <div className="space-x-2 text-sm">
                  <button
                    onClick={() => {
                      setEditIndex(index);
                      setEditText(cat);
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-600 hover:underline"
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
  );
};

export default CategoryManager;
