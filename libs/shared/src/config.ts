export interface ServiceIntercommConfigDto {
  urls: string[];
  queueOptions: {
    durable: boolean;
  };
}

const serviceIntercommConfig: ServiceIntercommConfigDto = {
  urls: ['amqp://admin:admin@localhost:5672'],
  queueOptions: {
    durable: true,
  },
};

export function ServiceIntercommEnabled(): boolean {
  return true;
}

export function ServiceIntercommGetConfig(): ServiceIntercommConfigDto {
  return serviceIntercommConfig;
}
