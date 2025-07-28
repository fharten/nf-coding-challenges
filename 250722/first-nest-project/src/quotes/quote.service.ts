import { Injectable } from '@nestjs/common';
import { Quotes } from '../types/quotes';
import { QuoteRepository } from './quote.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from './entity/quote.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuoteService {
  constructor(
    private readonly quoteRepository: QuoteRepository,

    @InjectRepository(Quote)
    private usersRepository: Repository<Quote>,
  ) {} // Inject the repository

  async getAllQuotes(): Promise<Quotes> {
    return this.quoteRepository.findAll();
  }

  async getQuoteById(id: number): Promise<Quote | undefined> {
    return this.quoteRepository.findById(id);
  }

  async getRandomQuote(): Promise<Quote | undefined> {
    return this.quoteRepository.findRandom();
  }
}
