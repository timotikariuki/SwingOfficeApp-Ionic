import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Platform } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


import { ConfigService } from './services/config.service';
import { TranslateService } from '@ngx-translate/core';
import { PushService } from "./services/push/push.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(
      public _cs: ConfigService,
      public platform: Platform,
      public splashScreen: SplashScreen,
      public statusBar: StatusBar,
      public translate: TranslateService,
      public pushService: PushService
  ) {
      this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        console.log('initializing app...');
        console.log('lang: ', this._cs.getLang());
        this.translate.setDefaultLang(this._cs.getLang());
        this.pushService.initConfig(); // OneSignal para notificaciones push
    });
  }

}
