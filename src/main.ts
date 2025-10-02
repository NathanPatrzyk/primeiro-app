import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

/*
- app.module.ts - é o módulo principal do sistema
- app.controller.ts - define as rotas e lida com as requisições
- app.service.ts - contém a lógica do negócio, separado do controller
*/

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000, () => {
    console.log('Listening on http://localhost:3000/');
  });
}
bootstrap();
