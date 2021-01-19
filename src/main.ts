import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  const options = new DocumentBuilder()
    .setTitle('API Doc')
    .setDescription('The API info')
    .setVersion('1.0')
    .addTag('todo')
    .addTag('course')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3939);
}
bootstrap();
