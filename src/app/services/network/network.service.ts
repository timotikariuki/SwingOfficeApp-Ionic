import { Injectable, OnDestroy, OnInit } from '@angular/core';

import { Plugins, NetworkStatus, PluginListenerHandle} from "@capacitor/core";
const { Network } = Plugins;

// Service
import { DataUserService } from "../data-user/data-user.service";
import { DataUserModel } from "../../models/DataUser.model";
import { error } from "util";

@Injectable({
  providedIn: 'root'
})
export class NetworkService implements OnInit, OnDestroy {

  public networkListener: PluginListenerHandle;
  public networkStatus: NetworkStatus = {
                            "connected": true,
                            "connectionType": "unknown"
                          } ;

  constructor(
      private _dus: DataUserService
  ) {
    this.ngOnInit();
  }

  async ngOnInit() {
    console.log('en ngOnInit(pages/home)');

    this.networkListener = Network.addListener( 'networkStatusChange', status => {
      console.log('Network status changed', status);
      this.networkStatus = status;
      if (status.connected) {
          this._dus.loadDataUser()
              .subscribe( (data: DataUserModel) => {
                console.log('data: ', data);
                this._dus._user.next(data);
              }),
              error( error => {
                console.log('error: ', error);
              });
      }
    });

    this.networkStatus = await Network.getStatus();

  }

  ngOnDestroy() {
    this.networkListener.remove();
  }

}
