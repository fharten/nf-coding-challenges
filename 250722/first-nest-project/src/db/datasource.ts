import 'reflect-metadata'; // Crucial for TypeORM entities/decorators
import { DataSource, DataSourceOptions } from 'typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv'; // If you're using .env files for config
import { User } from 'user/entity/user.entity';
import { Quote } from 'quotes/entity/quote.entity';

dotenv.config(); // Load environment variables from .env

type SafeDatabaseTypes = 'postgres' | 'sqlite';
const dbType = (process.env.DB_TYPE || 'sqlite') as SafeDatabaseTypes;

export const dataSourceOptions: DataSourceOptions = {
  type: dbType,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'database.sqlite', // For sqlite, this is the file path

  // Point to your entities (compiled .js files in dist for build)
  entities: [User, Quote],

  // Point to your migration files (compiled .js files in dist for build)
  migrations: [path.join(__dirname, '/database/migrations/*.{ts,.js}')],

  synchronize: false, // Ensure this is false here too!
  logging: true,
};

const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource;
