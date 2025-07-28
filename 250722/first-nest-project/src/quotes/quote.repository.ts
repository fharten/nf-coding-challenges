import { Injectable } from '@nestjs/common';
import { Quote, Quotes } from '../types/quotes';
import { getQuotesData } from './quotes.data';

@Injectable() // This makes it injectable into other parts of NestJS
export class QuoteRepository {
  private quotes: Quotes = [];

  private async init() {
    this.quotes = await getQuotesData();
  }

  async findAll(): Promise<Quotes> {
    await this.init();
    return [...this.quotes];
  }

  async findById(id: number): Promise<Quote | undefined> {
    await this.init();
    return this.quotes.find((quote) => quote.id === id); // Find a user by ID
  }

  async findRandom(): Promise<Quote | undefined> {
    await this.init();

    const randomIndex = Math.floor(Math.random() * this.quotes.length);
    return this.quotes[randomIndex];
  }
}
