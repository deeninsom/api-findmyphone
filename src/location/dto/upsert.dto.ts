import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpSertDeviceLocationDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  deviceId?: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  lat?: number;

  @ApiProperty()
  @IsOptional()
  @MinLength(6)
  lng?: number;
}