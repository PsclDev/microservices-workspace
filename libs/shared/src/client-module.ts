import { DynamicModule } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ServiceIntercommEnabled, ServiceIntercommGetConfig } from './config';
import { ServiceIntercommInjectionToken } from './definitions';

export function ServiceIntercommModules(queue: string): DynamicModule[] {
  if (!ServiceIntercommEnabled()) {
    return [];
  }

  return [
    ClientsModule.register([
      {
        name: ServiceIntercommInjectionToken,
        transport: Transport.RMQ,
        options: {
          ...ServiceIntercommGetConfig(),
          queue,
        },
      },
    ]),
  ];
}
