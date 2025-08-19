import React from 'react';
import { useSearchStore } from '../store/useAppStore';
import BookItem from './BookItem';

export interface Book {
  id: number;
  title: string;
  price: number;
}

const BookList = () => {
  const searchTerm = useSearchStore((state) => state.searchTerm);

  // Sample book data
  const books: Book[] = [
    { id: 1, title: 'The Great Gatsby', price: 10.99 },
    { id: 2, title: '1984', price: 8.99 },
    { id: 3, title: 'To Kill a Mockingbird', price: 12.5 },
  ];

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Available Books</h2>
      {filteredBooks.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
