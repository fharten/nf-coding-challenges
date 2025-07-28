import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  controllers: [BooksController], // Register controllers that belong to this module
  providers: [BooksService], // Register services (providers) that belong to this module
  exports: [BooksService], // Optional: if other modules need to inject BooksService, it must be exported
})
export class BooksModule {}
