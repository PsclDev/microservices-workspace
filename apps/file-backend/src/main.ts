import { NestFactory } from '@nestjs/core';
import { FileBackendModule } from './file-backend.module';
import { ServiceIntercommBootstrap } from '@app/shared';

async function bootstrap() {
  const app = await NestFactory.create(FileBackendModule);

  await ServiceIntercommBootstrap(app, '');
  await app.listen(3020);
}
bootstrap();
