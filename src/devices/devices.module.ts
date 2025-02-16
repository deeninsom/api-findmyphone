import { Module } from '@nestjs/common';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';
import { FirebaseService } from 'src/firebase./firebase.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtConfigFactory } from 'src/auth/jwt/jwt.config';
import { PrismaService } from 'src/prisma.service';

@Module({
    imports: [
      JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: JwtConfigFactory,
        inject: [ConfigService],
      }),
      ConfigModule
    ],
  controllers: [DevicesController],
  providers: [DevicesService, FirebaseService, PrismaService]
})
export class DevicesModule {}
