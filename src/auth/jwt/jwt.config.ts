import { HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const JwtConfigFactory = async (
  configService: ConfigService,
): Promise<JwtModuleOptions> => {
  const secret = configService.get<string>(`JWT_SECRET`);

  console.log(secret)
  // if (!secret) {
  //   throw new HttpException('JWT_SECRET is not defined in the configuration.', HttpStatus.INTERNAL_SERVER_ERROR);
  // }

  return {
    secret,
  };
};