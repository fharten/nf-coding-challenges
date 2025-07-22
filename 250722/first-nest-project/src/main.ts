import { NestFactory } from '@nestjs/core';
import { QuoteModule } from './quotes/quote.module';
// import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(QuoteModule);
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server running on ${await app.getUrl()}`);
}
bootstrap();
