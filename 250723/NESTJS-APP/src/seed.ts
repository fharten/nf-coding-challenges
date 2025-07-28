import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { QuotesService } from "./quotes/quotes.service";

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const quotesService = app.get(QuotesService);
  await quotesService.saveQuotesFromJson(); // Methode wie oben beschrieben
  await app.close();
}

bootstrap();
