import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async register(dto: RegisterDto) {
    // Cek apakah user sudah ada
    const existingUser = await this.prisma.users.findFirst({
      where: { OR: [{ email: dto.email }] },
    });

    if (existingUser) {
      return this.handleDevice(existingUser.id, dto.deviceId, dto.fcmToken);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Buat user baru
    const user = await this.prisma.users.create({
      data: {
        username: dto.username,
        email: dto.email,
        password: hashedPassword,
      },
    });

    // Handle device
    return this.handleDevice(user.id, dto.deviceId, dto.fcmToken);
  }

  async login(dto: LoginDto & { deviceId: string; fcmToken: string }) {
    const existingUser = await this.prisma.users.findUnique({ where: { email: dto.email } });
    if (!existingUser || !(await bcrypt.compare(dto.password, existingUser.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Handle device update jika `deviceId` sudah ada tetapi `fcmToken` berbeda
    return this.handleDevice(existingUser.id, dto.deviceId, dto.fcmToken);
  }

  private async handleDevice(userId: string, deviceId: string, fcmToken: string) {
    const existingDevice = await this.prisma.devices.findUnique({ where: { deviceId } });

    if (existingDevice) {
      if (existingDevice.fcmToken !== fcmToken) {
        await this.prisma.devices.update({
          where: { deviceId },
          data: { fcmToken },
        });
      }
    } else {
      await this.prisma.devices.create({
        data: { deviceId, fcmToken, userId },
      });
    }

    return {
      accessToken: this.jwtService.sign({ userId }),
    };
  }

  async logout(deviceId: string) {
    const existingDevice = await this.prisma.devices.findUnique({
        where: { deviceId },
    });

    if (!existingDevice) {
        throw new UnauthorizedException('Device not found');
    }

    // Set fcmToken menjadi null atau hapus data perangkat
    await this.prisma.devices.update({
        where: { deviceId },
        data: { fcmToken: null },
    });

    return { message: 'Logged out successfully' };
}
}