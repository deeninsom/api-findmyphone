import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpSertDeviceLocationDto } from './dto/upsert.dto';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) { }

  // Menggunakan upsert untuk membuat atau memperbarui data
  async upsertDeviceLocation(dto: UpSertDeviceLocationDto) {
    console.log(dto)
    try {
      const findDeviceLocation = await this.prisma.deviceLocation.findFirst({
        where: {
          deviceId: dto.deviceId,
        }
      })

      if (findDeviceLocation) {
        await this.prisma.deviceLocation.update({
          where: {
            id: findDeviceLocation.id,  // Menentukan kunci unik untuk update
          },
          data: {
            deviceId: dto.deviceId,   // Membuat entri baru jika tidak ditemukan
            lat: dto.lat,
            lng: dto.lng,
          },
        });
      } else {
        await this.prisma.deviceLocation.create({
          data: {
            deviceId: dto.deviceId,   // Membuat entri baru jika tidak ditemukan
            lat: dto.lat,
            lng: dto.lng,
          },
        });
      }

      return "sukses";
    } catch (error) {
      // Menangani konflik atau error lainnya
      throw new ConflictException('Terjadi kesalahan dalam memperbarui lokasi perangkat');
    }
  }
}
