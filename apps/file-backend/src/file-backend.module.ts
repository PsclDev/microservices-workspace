import { Module } from '@nestjs/common';
import { FileBackendController } from './file-backend.controller';
import { FileBackendService } from './file-backend.service';

@Module({
  imports: [],
  controllers: [FileBackendController],
  providers: [FileBackendService],
})
export class FileBackendModule {}
