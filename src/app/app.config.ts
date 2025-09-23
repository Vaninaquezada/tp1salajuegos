import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';

const firebaseConfig = {
  apiKey: 'AIzaSyDaDxkZHkwvJy0N7o_DVcmMXIx_6vPSZ7I',
  authDomain: 'tplab4-45942.firebaseapp.com',
  databaseURL: 'https://tplab4-45942.firebaseio.com',
  projectId: 'tplab4-45942',
  storageBucket: 'tplab4-45942.appspot.com',
  messagingSenderId: '544089026720',
  appId: '1:544089026720:web:12140e7d4d8c437ea759c5',
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(AngularFireModule.initializeApp(firebaseConfig)),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
};
