import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ServiceIntercommBootstrap } from '@app/shared';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await ServiceIntercommBootstrap(app, '');
  await app.listen(3010);
}
bootstrap();
