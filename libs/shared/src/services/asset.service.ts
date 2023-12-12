import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { ServiceIntercommInjectionToken } from '../definitions';
import { performIntercommCallWithTimeout } from '../helper';
import { ServiceIntercommId } from '../intercomm-identifiers';

export type SharedAssetDto = { assetId: number; name: string };

@Injectable()
export class SharedAssetService {
  private readonly logger: Logger = new Logger('SharedAssetService');

  constructor(
    @Inject(ServiceIntercommInjectionToken)
    private readonly client: ClientProxy,
  ) {}

  async getAssetInfoById(id: string): Promise<SharedAssetDto> {
    return await performIntercommCallWithTimeout<
      {
        id: string;
      },
      SharedAssetDto
    >(this.logger, this.client, ServiceIntercommId.GetAssetInfoById, {
      id,
    });
  }
}
