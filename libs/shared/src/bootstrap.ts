import { INestApplication } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

import { ServiceIntercommEnabled, ServiceIntercommGetConfig } from './config';

export async function ServiceIntercommBootstrap(
  app: INestApplication,
  queue: string,
) {
  if (!ServiceIntercommEnabled()) {
    // Print message
    ServiceIntercommEnabled();
    return;
  }

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      ...ServiceIntercommGetConfig(),
      queue,
    },
  });

  await app.startAllMicroservices();

  console.log(`[Info] Service intercommunication ENABLED`);
}
