import { IsString, IsNumber, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';

export class BookResponseDto {
  @IsUUID()
  @Expose() // We want to expose the ID
  id: string;

  @IsString()
  @Expose() // We want to expose the title
  title: string;

  @IsString()
  @Expose() // We want to expose the author
  author: string;

  @IsString()
  @Expose() // We want to expose the ISBN
  isbn: string;

  @IsNumber()
  @Expose() // We want to expose the published year
  publishedYear: number;

  // Notice that 'createdAt' and 'internalNotes' from BookEntity are NOT included
  // and NOT decorated with @Expose(). They will NOT be part of the API response.
}
