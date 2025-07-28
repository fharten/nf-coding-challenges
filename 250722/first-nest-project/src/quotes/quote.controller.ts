import { Controller, Get, Param } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { Quote, Quotes } from '../types/quotes';

@Controller('quotes')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Get('/')
  async getAll(): Promise<Quotes> {
    return this.quoteService.getAllQuotes();
  }

  @Get('/random')
  async getRandom() {
    return this.quoteService.getRandomQuote();
  }

  @Get('/:id')
  async getOne(@Param('id') id: number): Promise<Quote | undefined> {
    const quote = this.quoteService.getQuoteById(id);
    return quote;
  }
}
