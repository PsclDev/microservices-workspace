import { Controller, Get, Post } from '@nestjs/common';
import { FileBackendService } from './file-backend.service';
import { AssetFilesDto, ExpandedFileDto, FileDto } from '@app/shared/dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ServiceIntercommId } from '@app/shared';

@Controller()
export class FileBackendController {
  constructor(private readonly appService: FileBackendService) {}

  @Get('without-assets')
  async getFilesWithoutAssets(): Promise<FileDto[]> {
    return this.appService.getWithoutAssets();
  }

  @Get('with-assets')
  async getFilesWithAssets(): Promise<ExpandedFileDto[]> {
    return this.appService.getWithAssets();
  }

  @MessagePattern(ServiceIntercommId.GetFilesByAssetId)
  async getFileByAssetId(
    @Payload() data: { assetId: string },
  ): Promise<AssetFilesDto> {
    console.log('getFileByAssetId', data);
    return await this.appService.byAssetId(data.assetId);
  }

  @Post()
  async createAsset(): Promise<FileDto> {
    return this.appService.create();
  }
}
