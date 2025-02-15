import { Module } from '@nestjs/common';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';
import { FirebaseService } from 'src/firebase./firebase.service';

@Module({
  controllers: [DevicesController],
  providers: [DevicesService, FirebaseService]
})
export class DevicesModule {}
