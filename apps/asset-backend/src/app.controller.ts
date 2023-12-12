import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ReducedAssetDto, AssetDto } from '@app/shared/dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('without-files')
  async getAssetWithoutFiles(): Promise<ReducedAssetDto[]> {
    return this.appService.getWithoutFiles();
  }

  @Get('with-files')
  async getAssetWithFiles(): Promise<AssetDto[]> {
    return await this.appService.getWithFiles();
  }

  @Post()
  async createAsset(): Promise<AssetDto> {
    return this.appService.create();
  }
}
