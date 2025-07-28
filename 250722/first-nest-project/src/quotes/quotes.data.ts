import * as path from 'path';
import { readFile } from 'node:fs/promises';
import { Quotes } from '../types/quotes';

const FILE_PATH = path.join(__dirname, '..', 'data', 'quotes.json');
let cachedQuotes: Quotes | null = null;

export async function getQuotesData(): Promise<Quotes> {
  if (!cachedQuotes) {
    const fileContent = await readFile(FILE_PATH, 'utf-8');
    cachedQuotes = JSON.parse(fileContent) as Quotes;
  }
  return cachedQuotes;
}
