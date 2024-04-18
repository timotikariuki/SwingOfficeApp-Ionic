import { Injectable } from '@angular/core';
import { OneSignal } from "@ionic-native/onesignal/ngx";
import { Storage } from "@ionic/storage";
import { ConfigService } from "../config.service";

@Injectable({
  providedIn: 'root'
})
export class PushService {

  userId: string = '';

  constructor(
      private oneSignal: OneSignal
  ) { }

  initConfig() {

    // this.oneSignal.startInit( "33ebbb52-5eae-4ce6-a669-1500c36f7659", "329105138469" ); // SwingOffice 59
    this.oneSignal.startInit( "de9826df-2002-48d7-861e-0bd3c97ab4a1", "329105138469" ); // SwingOffice-Tandem, SwingOffice-Push

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe((notificacion) => {
      // do something when notification is received
      console.log('notificación Recibida', notificacion);
    });

    this.oneSignal.handleNotificationOpened().subscribe((notificacion) => {
      // do something when a notification is opened
      console.log('notificación Abierta', notificacion);
    });

    // Obtener el Id del subscriptor
    this.oneSignal.getIds().then( info => {
      this.userId = info.userId;
      console.log('====>>> [] userID: ', this.userId);
    });

    this.oneSignal.endInit();

  }



}
