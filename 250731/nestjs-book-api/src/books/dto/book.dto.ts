import { IsNotEmpty } from 'class-validator';

export class BookDto {
  @IsNotEmpty()
  isbn: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  subtitle: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  authors: Array<string>;

  @IsNotEmpty()
  imageUrl: string;

  @IsNotEmpty()
  createdAt: string;
}
