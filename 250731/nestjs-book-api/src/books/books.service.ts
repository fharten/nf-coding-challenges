import { Injectable, NotFoundException } from '@nestjs/common';
import { readFile, writeFile } from 'node:fs/promises';
import * as path from 'node:path';
import { Book, Books } from 'src/types/book';

const BOOKS_FILE = path.join(__dirname, '../data/books.json');

@Injectable()
export class BooksService {
  async getAllBooks(): Promise<Books> {
    const data = await readFile(BOOKS_FILE, 'utf-8');
    return JSON.parse(data) as Books;
  }

  private async saveBooks(books: Books): Promise<void> {
    await writeFile(BOOKS_FILE, JSON.stringify(books, null, 2), 'utf-8');
  }

  async addBook(newBook: Book): Promise<Book> {
    const books = await this.getAllBooks();
    newBook.createdAt = new Date().toString();
    books.push(newBook);
    await writeFile(BOOKS_FILE, JSON.stringify(books, null, 2), 'utf-8');
    return newBook;
  }

  async getBookById(isbn: string): Promise<Book | null> {
    const books = await this.getAllBooks();
    const bookById = books.filter((book) => book.isbn === isbn);
    if (bookById.length < 1)
      throw new NotFoundException(`Book with ISBN ${isbn} not found.`);

    return bookById[0];
  }

  async updateBook(
    isbn: string,
    updateData: Partial<Book>,
  ): Promise<Book | null> {
    const books = await this.getAllBooks();

    const index = books.findIndex((book) => book.isbn === isbn);
    if (index === -1) {
      throw new NotFoundException(`Book with ISBN ${isbn} not found.`);
    }

    const updatedBook = { ...books[index], ...updateData };
    books[index] = updatedBook;

    await this.saveBooks(books);
    return updatedBook;
  }

  async deleteBook(isbn: string) {
    const books = await this.getAllBooks();
    const updatedBooks = books.filter((book) => book.isbn !== isbn);

    if (updatedBooks.length === books.length) {
      throw new NotFoundException(`Book with ISBN ${isbn} not found.`);
    }

    await this.saveBooks(updatedBooks);
  }
}
