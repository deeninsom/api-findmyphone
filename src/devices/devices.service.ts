import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { FirebaseService } from 'src/firebase./firebase.service';

@Injectable()
export class DevicesService {
  constructor(private readonly firebaseService: FirebaseService) {}

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
        priority: 'high' as any, // Fix tipe priority Firebase
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
}