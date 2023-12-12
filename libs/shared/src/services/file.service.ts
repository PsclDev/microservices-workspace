import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { ServiceIntercommInjectionToken } from '../definitions';
import { performIntercommCallWithTimeout } from '../helper';
import { ServiceIntercommId } from '../intercomm-identifiers';
import { AssetFilesDto, FileDto } from '../dto';

@Injectable()
export class SharedFileService {
  private readonly logger: Logger = new Logger('SharedFileService');

  constructor(
    @Inject(ServiceIntercommInjectionToken)
    private readonly client: ClientProxy,
  ) {}

  async getFilesByAssetId(assetId: string): Promise<AssetFilesDto> {
    return await performIntercommCallWithTimeout<
      {
        assetId: string;
      },
      AssetFilesDto
    >(this.logger, this.client, ServiceIntercommId.GetFilesByAssetId, {
      assetId,
    });
  }
}
