/* components/BookItem.js */
import React from 'react';
import { Book } from './BookList';
import { useCartStore } from '../store/useAppStore';

function BookItem({ book }: { book: Book }) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddClick = () => {
    addToCart(book);
  };

  console.log(`BookItem rendered: ${book.title}`);

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        marginBottom: '10px',
      }}
    >
      <h3>{book.title}</h3>
      <p>Price: ${book.price}</p>
      <button onClick={handleAddClick}>Add to Cart</button>
    </div>
  );
}

export default BookItem;
