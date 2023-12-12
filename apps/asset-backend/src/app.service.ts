import { SharedFileService } from '@app/shared';
import { AssetDto, ReducedAssetDto } from '@app/shared/dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly sharedFileService: SharedFileService) {}

  lastAssetId = 3;
  assets: AssetDto[] = [
    { id: 1, name: 'asset-1' },
    { id: 2, name: 'asset-2' },
    { id: 3, name: 'asset-3' },
  ];

  async getWithoutFiles(): Promise<ReducedAssetDto[]> {
    try {
      return this.assets;
    } catch (error) {
      console.log('getWithoutFiles', error);
    }
  }

  async getWithFiles(): Promise<AssetDto[]> {
    try {
      for (const asset of this.assets) {
        const assetFiles = await this.sharedFileService.getFilesByAssetId(
          `asset-${asset.id}`,
        );
        console.log('assetFiles', assetFiles);
        asset.files = assetFiles.files;
      }

      return this.assets;
    } catch (error) {
      console.log('getWithFiles', error);
    }
  }

  async create(): Promise<AssetDto> {
    try {
      this.lastAssetId++;
      const newAsset: AssetDto = {
        id: this.lastAssetId,
        name: `asset-${this.lastAssetId}`,
      };

      this.assets.push(newAsset);
      return newAsset;
    } catch (error) {
      console.log('create', error);
    }
  }
}
