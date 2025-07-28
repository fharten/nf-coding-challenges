import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { QuoteModule } from './quotes/quote.module';
import { AdminModule } from './admin/admin.module';
import { User } from './user/entity/user.entity';
import { Quote } from './quotes/entity/quote.entity';

@Module({
  imports: [
    UserModule,
    QuoteModule,
    AdminModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [User, Quote],
      synchronize: false,
      migrations: [__dirname + '/../database/migrations/*.{js,ts}'], // Path to your migration files
      migrationsRun: false, // Set to true if you want migrations to run on app start (careful in prod!)
      logging: ['query', 'error'], // Set to 'all' or true to see SQL queries in the console (useful for debugging)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
