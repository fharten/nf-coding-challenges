import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDto } from './dto/book.dto';
import { Book, Books } from 'src/types/book';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('/')
  async showAllBooks(): Promise<Books> {
    return await this.booksService.getAllBooks();
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async createBook(@Body() body: BookDto): Promise<Book> {
    return this.booksService.addBook(body);
  }

  @Get('/:isbn')
  async showBookById(@Param('isbn') isbn: string) {
    const book = await this.booksService.getBookById(isbn);

    return book;
  }

  @Put('/:isbn')
  async updateBook(
    @Body() updateData: BookDto,
    @Param('isbn') isbn: string,
  ): Promise<Book | null> {
    const book = await this.booksService.updateBook(isbn, updateData);

    return book;
  }

  @Delete('/:isbn')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBook(@Param('isbn') isbn: string): Promise<void> {
    const book = await this.booksService.deleteBook(isbn);

    if (book === null) {
      throw new NotFoundException(`Book with ID ${isbn} not found.`);
    }
  }
}
