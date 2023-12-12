import { ClientProxy, ReadPacket, WritePacket } from '@nestjs/microservices';

export class UnsupportedClientProxy extends ClientProxy {
  async connect() {
    console.error(
      `Connect - [Error] APP Service Intercommunication not enabled! Missing envs!`,
    );
  }

  async close() {
    console.error(
      `Close - [Error] APP Service Intercommunication not enabled! Missing envs!`,
    );
  }

  async dispatchEvent(packet: ReadPacket<any>): Promise<any> {
    throw new Error(`APP Service Intercommunication not enabled`);
  }

  publish(
    packet: ReadPacket<any>,
    callback: (packet: WritePacket<any>) => void,
  ): () => void {
    throw new Error(`APP Service Intercommunication not enabled`);
  }
}
