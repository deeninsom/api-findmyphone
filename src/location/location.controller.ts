import { Body, Controller, Post } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}
  @Post()
  async createUser(@Body() dto: any) {
    return this.locationService.upsertDeviceLocation(dto);
  }
}
