import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

/*
- app.module.ts - é o módulo principal do sistema
- app.controller.ts - define as rotas e lida com as requisições
- app.service.ts - contém a lógica do negócio, separado do controller
*/

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000, () => {
    console.log('Listening on http://localhost:3000/');
  });
}
bootstrap();
