import { useState } from 'react';
import CategoryManager from '../component/TransactionCategorization';

export default function Dashboard() {
  const [categories, setCategories] = useState({
    income: ['Salary', 'Business', 'Investment'],
    expense: ['Food', 'Rent', 'Utilities'],
  });

  return (
    <>
      <CategoryManager categories={categories} setCategories={setCategories} />
    </>
  );
}