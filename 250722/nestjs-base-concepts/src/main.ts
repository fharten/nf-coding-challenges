import { Controller, Get, Module, Injectable } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

@Injectable()
class AppService {
  generateMessage() {
    return 'Hello World';
  }
}

@Controller()
class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  showHello() {
    return this.appService.generateMessage();
  }
}

@Module({ controllers: [AppController], providers: [AppService] })
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(7777);
  console.log(`Server running on ${await app.getUrl()}`);
}

bootstrap();
