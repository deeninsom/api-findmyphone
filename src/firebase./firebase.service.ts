import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as path from 'path';

// Menentukan lokasi file JSON dengan aman
const serviceAccountPath = path.resolve(__dirname, '../../findmyphone-3b019-firebase-adminsdk-fbsvc-f49586745d.json');
const serviceAccount = require(serviceAccountPath);

@Injectable()
export class FirebaseService implements OnModuleInit {
  private static initialized = false;

  onModuleInit() {
    if (!FirebaseService.initialized) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });

      FirebaseService.initialized = true;
      console.log('Firebase initialized successfully');
    }
  }

  getAdmin(): admin.app.App {
    return admin.app();
  }

  getMessaging(): admin.messaging.Messaging {
    return admin.messaging();
  }
}