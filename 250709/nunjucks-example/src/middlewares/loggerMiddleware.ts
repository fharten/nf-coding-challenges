import type { Request, Response, NextFunction } from 'express';
import { access, appendFile, constants, writeFile } from 'node:fs/promises';
import * as path from 'node:path';

const LOG_DIR = path.join(__dirname, '..', '..', 'logs');
const LOG_FILE = path.join(LOG_DIR, 'logs.txt');

async function addLoggMessage(message: string): Promise<void> {
  try {
    if (message.length > 20) return await appendFile(LOG_FILE, message + '\n');
    throw new Error('Message is not as expected. Please check format.');
  } catch (error) {
    console.error(`Error adding log message: ${error}`);
  }
}

async function fileExists(): Promise<boolean> {
  try {
    await access(LOG_FILE, constants.R_OK && constants.W_OK);
    return true;
  } catch (error) {
    return false;
  }
}

async function createLogFile(): Promise<void> {
  try {
    await writeFile(LOG_FILE, 'data', { encoding: 'utf-8' });
  } catch (error) {
    console.error(`Error creating test file: ${error}`);
  }
}

// iife immidiate invoked function expression
(async () => {
  try {
    if (!(await fileExists())) await createLogFile();
  } catch (error) {
    console.error(`Error creating test file: ${error}`);
  }
})();

/**
 * Definition of log entry
 *
 * fields:
 * - current time & date
 * - HTTP method
 * - IP address
 * - request url
 */
export async function logger(req: Request, res: Response, next: NextFunction) {
  const { ip, originalUrl: url, method } = req;

  const dateTime = new Date().toISOString();

  await addLoggMessage([dateTime, method, ip, url].join(' '));
  next();
}
