import { Module } from '@nestjs/common';
import { SharedAssetService } from './services/asset.service';
import { SharedFileService } from './services/file.service';
import { ServiceIntercommEnabled } from './config';
import { ServiceIntercommInjectionToken } from './definitions';
import { UnsupportedClientProxy } from './unsupported-client-proxy';
import { ServiceIntercommModules } from './client-module';

@Module({
  imports: [...ServiceIntercommModules('')],
  providers: [
    SharedAssetService,
    SharedFileService,
    ...(ServiceIntercommEnabled()
      ? []
      : [
          {
            provide: ServiceIntercommInjectionToken,
            useClass: UnsupportedClientProxy,
          },
        ]),
  ],
  exports: [
    SharedAssetService,
    SharedFileService,
    ...(ServiceIntercommEnabled()
      ? []
      : [
          {
            provide: ServiceIntercommInjectionToken,
            useClass: UnsupportedClientProxy,
          },
        ]),
  ],
})
export class SharedModule {}
