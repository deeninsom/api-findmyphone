import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { DevicesService } from './devices.service';

@Controller('devices')
export class DevicesController {
  constructor(private readonly deviceService: DevicesService) {}

  @Post('wakeup')
  async wakeUpDevice(
    @Body('deviceId') deviceId: string,
    @Body('fcmToken') fcmToken: string,
  ) {
    if (!deviceId || !fcmToken) {
      throw new HttpException('Device ID and FCM Token are required', HttpStatus.BAD_REQUEST);
    }

    return this.deviceService.sendWakeUpSignal(deviceId, fcmToken);
  }
}