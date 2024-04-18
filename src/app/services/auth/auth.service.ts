import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { ConfigService } from "../config.service";
import { DataUserService } from "../data-user/data-user.service";
// import { StorageService } from "../storage/storage.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    isLoggedIn: boolean;

    constructor(
        public http: HttpClient,
        // private _ss: StorageService,
        public _cs: ConfigService,
    ) {}


    logInApp(credentials) {
        console.log('en loginApp()');

        let url = this._cs.getUrlServices() + "LoginApp/index";
        return this.http.post(url, credentials);
    }


    IsLoggedIn() {
        // console.log('*************** Logged In segun auth.isLoggedIn? ', this.isLoggedIn);
        return (this.isLoggedIn);
    }


    // IsLocalStorage() {
    //     return this._ss.IsLocalStorage();
    // }


    // saveStorage(data) {
    //     return this._ss.saveStorage(data);
    // }


    // resetStorage() {
    //     this._ss.resetStorage();
    // }


    setLoggedIn(logged) {
        this.isLoggedIn = logged;
    }


}
