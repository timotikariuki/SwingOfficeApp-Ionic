import { Injectable } from '@angular/core';
import { LoadingController } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  isLoading = false;

  constructor(
      public loading: LoadingController
  ) { }


  async presentLoader() {
    this.isLoading = true;
    return await this.loading.create({
      duration: 5000,
    }).then(a => {
      a.present().then(() => {
        console.log('loader presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort loading presenting'));
        }
      });
    });
  }

  async dismissLoader() {
    this.isLoading = false;
    return await this.loading.dismiss().then(() => console.log('loading dismissed'));
  }

}
