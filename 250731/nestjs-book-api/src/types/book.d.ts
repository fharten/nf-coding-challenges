export interface Book {
  isbn: string;
  title: string;
  subtitle: string;
  description: string;
  authors: array;
  imageUrl: string;
  createdAt: string;
}

export type Books = Book[];
