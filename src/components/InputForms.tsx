import React, { useState } from 'react';

type TransactionType = 'income' | 'expense';

interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  date: string;
  category: string;
  notes?: string;
}

interface Props {
  onAddTransaction: (transaction: Transaction) => void;
}

const defaultCategories = {
  income: ['Salary', 'Business', 'Investment'],
  expense: ['Food', 'Rent', 'Utilities', 'Entertainment'],
};

const TransactionForm: React.FC<Props> = ({ onAddTransaction }) => {
  const [type, setType] = useState<TransactionType>('income');
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !date || !category) {
      alert('Please fill in all required fields.');
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type,
      amount,
      date,
      category,
      notes: notes.trim() ? notes : undefined,
    };

    onAddTransaction(newTransaction);

    // Reset form
    setAmount(0);
    setDate('');
    setCategory('');
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 shadow-md rounded bg-white">
      <h2 className="text-xl font-semibold mb-4">Add {type === 'income' ? 'Income' : 'Expense'}</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Type</label>
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value as TransactionType);
            setCategory('');
          }}
          className="w-full p-2 border rounded"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Amount (₦)</label>
        <input
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select category</option>
          {defaultCategories[type].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Notes (optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-2 border rounded"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
      >
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
