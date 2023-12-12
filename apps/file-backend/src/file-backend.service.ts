import { Injectable } from '@nestjs/common';
import { AssetFilesDto, ExpandedFileDto, FileDto } from '@app/shared/dto';

@Injectable()
export class FileBackendService {
  lastFileId = 3;
  files: FileDto[] = [
    { id: 1, assetId: 'asset-1', size: 12345 },
    { id: 2, assetId: 'asset-2', size: 98765 },
    { id: 3, assetId: 'asset-3', size: 45678 },
  ];

  async getWithoutAssets(): Promise<FileDto[]> {
    try {
      return this.files;
    } catch (error) {
      console.log('getWithoutAssets', error);
    }
  }

  async getWithAssets(): Promise<ExpandedFileDto[]> {
    try {
      //TODO: get assets
      return this.files as ExpandedFileDto[];
    } catch (error) {
      console.log('getWithAssets', error);
    }
  }

  async byAssetId(assetId: string): Promise<AssetFilesDto> {
    try {
      return {
        files: this.files.filter((f) => f.assetId === assetId),
      };
    } catch (error) {
      console.log('byAssetId', error);
    }
  }

  async create(): Promise<FileDto> {
    try {
      this.lastFileId++;
      const newFile: FileDto = {
        id: this.lastFileId,
        assetId: `asset-${this.lastFileId}`,
        size: Math.floor(Math.random() * 100000),
      };

      this.files.push(newFile);
      return newFile;
    } catch (error) {
      console.log('create', error);
    }
  }
}
