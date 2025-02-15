import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtConfigFactory } from 'src/auth/jwt/jwt.config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: JwtConfigFactory,
      inject: [ConfigService],
    }),
    ConfigModule
  ],
  controllers: [UsersController],
  providers: [UsersService, PrismaService]
})
export class UsersModule {}
