import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DevicesModule } from './devices/devices.module';

// prisma service
import { PrismaService } from './prisma.service';
import { FirebaseService } from './firebase./firebase.service';
import { AppGateway } from './gateway/app/app.gateway';
import { LocationService } from './location/location.service';
import { LocationController } from './location/location.controller';
import { LocationModule } from './location/location.module';

@Module({
  imports: [
    AuthModule, 
    UsersModule, 
    DevicesModule, LocationModule
  ],

  providers: [PrismaService, FirebaseService, AppGateway, LocationService],

  controllers: [LocationController],
})
export class AppModule {}
