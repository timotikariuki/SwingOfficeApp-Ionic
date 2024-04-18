import { Injectable } from '@angular/core';

// import { Storage } from "@ionic/storage";

import { ConfigService } from "../config.service";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  lang = 'en';

  constructor(
      // public storage: Storage
      private _cs: ConfigService
  ) {
    this.getLang();
  }


  getLang() {
    this.lang = this._cs.getLang();

    // if ( localStorage.getItem('lang') ) {
    //   return localStorage.getItem('lang');
    // } else {
    //   return this.lang;
    // }
  }

}
