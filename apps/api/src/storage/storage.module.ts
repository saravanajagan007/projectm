import { Global, Module } from '@nestjs/common';
import { LocalStorageService } from './storage.service';

export const STORAGE_SERVICE = 'STORAGE_SERVICE';

@Global()
@Module({
  providers: [
    {
      provide: STORAGE_SERVICE,
      useClass: LocalStorageService,
    },
    LocalStorageService,
  ],
  exports: [STORAGE_SERVICE, LocalStorageService],
})
export class StorageModule {}
