/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { Book } from './interfaces/book.interface';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique IDs

@Injectable() // Marks this class as a provider that can be injected
export class BooksService {
  private readonly books: Book[] = []; // In-memory storage for books

  /**
   * Creates a new book and adds it to the in-memory array.
   * @ param book The book data, excluding the ID.
   * @ returns The newly created book with an assigned unique ID.
   */
  create(book: Omit<Book, 'id'>): Book {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newId: string = uuidv4();
    const newBook: Book = { id: newId, ...book }; // Generate a unique ID
    this.books.push(newBook);
    return newBook;
  }

  /**
   * Retrieves all books from the in-memory array.
   * @ returns An array of all books.
   */
  findAll(): Book[] {
    return this.books;
  }

  /**
   * Retrieves a single book by its ID.
   * @ param id The ID of the book to find.
   * @ returns The book object if found, otherwise undefined.
   */
  findOne(id: string): Book | undefined {
    return this.books.find((book) => book.id === id);
  }

  /**
   * Updates an existing book by its ID.
   * @ param id The ID of the book to update.
   * @ param updatedBook The partial book data to apply.
   * @ returns The updated book object if found and updated, otherwise undefined.
   */
  update(id: string, updatedBook: Partial<Book>): Book | undefined {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex > -1) {
      this.books[bookIndex] = { ...this.books[bookIndex], ...updatedBook, id }; // Ensure ID remains the same
      return this.books[bookIndex];
    }
    return undefined;
  }

  /**
   * Removes a book by its ID.
   * @ param id The ID of the book to remove.
   * @ returns True if the book was removed, false otherwise.
   */
  remove(id: string): boolean {
    const initialLength = this.books.length;
    // Filter out the book to be removed
    const newBooks = this.books.filter((book) => book.id !== id);
    // If the length changed, it means a book was removed
    if (newBooks.length < initialLength) {
      // Update the original array reference to reflect removal
      this.books.splice(0, this.books.length, ...newBooks);
      return true;
    }
    return false;
  }
}
