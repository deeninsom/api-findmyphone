import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { FirebaseService } from 'src/firebase./firebase.service';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DevicesService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private prisma: PrismaService
  ) { }

  async sendWakeUpSignal(deviceId: string, fcmToken: string, customData?: Record<string, string>) {
    if (!deviceId) {
      throw new HttpException('Device ID is required', HttpStatus.BAD_REQUEST);
    }

    console.log(`Sending wake-up signal to device: ${deviceId} via FCM`);

    const message = {
      token: fcmToken,
      data: {
        deviceId,
        action: 'WAKE_UP',
        ...customData,
      },
      android: {
        priority: 'high' as any, 
      },
      apns: {
        payload: {
          aps: {
            contentAvailable: true,
          },
        },
      },
    };

    try {
      const messaging = this.firebaseService.getMessaging();
      const response = await messaging.send(message);
      console.log(`FCM wake-up message sent: ${response}`);
      return { success: true, message: `Wake-up signal sent to device: ${deviceId}` };
    } catch (error) {
      console.error('Error sending FCM wake-up signal:', error);
      throw new HttpException('Failed to send wake-up signal', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteDevice(deviceId: string) {
    if (!deviceId) {
      throw new HttpException('Device ID is required', HttpStatus.BAD_REQUEST);
    }

    try {
      // Example logic for deleting a device.
      // This could involve removing device data from a database, or sending a request to Firebase for removal.
      console.log(`Deleting device with ID: ${deviceId}`);
      await this.prisma.devices.delete({ where: { id: deviceId } })
      // Assuming Firebase is being used for device registration, you can perform the deletion here.
      // Example:
      // const messaging = this.firebaseService.getMessaging();
      // await messaging.unsubscribeFromTopic(deviceId);

      // If you have a database, you might delete the device record from there, e.g.
      // await this.deviceRepository.delete({ id: deviceId });

      return { success: true, message: `Device with ID ${deviceId} deleted successfully` };
    } catch (error) {
      console.error('Error deleting device:', error);
      throw new HttpException('Failed to delete device', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}