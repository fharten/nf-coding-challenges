import { Injectable } from '@nestjs/common';
import { Quote, Quotes } from 'src/types/quotes';
import { QuoteRepository } from './quote.repository';

@Injectable()
export class QuoteService {
  constructor(private readonly quoteRepository: QuoteRepository) {} // Inject the repository

  async getAllQuotes(): Promise<Quotes> {
    return this.quoteRepository.findAll();
  }

  async getQuoteById(id: string): Promise<Quote | undefined> {
    return this.quoteRepository.findById(id);
  }

  async getRandomQuote(): Promise<Quote | undefined> {
    return this.quoteRepository.findRandom();
  }
}
