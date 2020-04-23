import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });
  app.use(cookieParser());

  const options = new DocumentBuilder()
    .setTitle('Cupcake API')
    .setDescription(
      'Boilerplate API for creating web apps with React/Redux and SSR',
    )
    .setVersion('1.0')
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(8000);
}
bootstrap();
