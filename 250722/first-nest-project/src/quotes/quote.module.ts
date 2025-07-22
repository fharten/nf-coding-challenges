import { Module } from '@nestjs/common';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';
import { QuoteRepository } from './quote.repository';

@Module({
  imports: [],
  controllers: [QuoteController],
  providers: [QuoteService, QuoteRepository],
})
export class QuoteModule {}
