import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { NewsModel } from '../../models/news.model';


@Injectable({
    providedIn: 'root'
})
export class NewsService {

    data: any;
    subfolder = '';
    token = '';



    news: NewsModel[] = [];

    constructor(
        public http: HttpClient,
        public storage: Storage
    ) {


        // this.storage.get('appSchool').then((data: any) => {
        //     console.log(data);
        //     this.school = data;
        //     console.log(this.school);
        //     this.getAllNews();
        // })
        //     .catch(() => {});
        //
        // this.storage.get('appSubfolder').then((data: any) => {
        //     this.subfolder = data;
        //     console.log(data);
        //     // this.subfolder = 'local_slel4lL50292DVjer9902';
        //     console.log(this.subfolder);
        // })
        //     .catch(() => {});
        //
        //
        // this.storage.get('appToken').then((data: any) => {
        //     this.subfolder = data;
        //     console.log(data);
        //     // this.subfolder = 'local_slel4lL50292DVjer9902';
        //     console.log(this.token);
        // })
        //     .catch(() => {});

    }

    getNew(newsID: number) {
        return {
            ...this.news.find(news => {
                return news.id === newsID;
            })
        };
    }


    getAllNews(urlServices, school) {
        console.log('getAllNews desde el servicio news:');
        const url = urlServices + "news-apps";
        console.log(url);

        return this.http.get( url )
            .pipe(map((resp: any) => {
                    return resp.data;
                }),
                catchError( ( err ) => {
                    console.log('Error recibiendo las noticias: ');
                    console.log(err);
                    return Observable.prototype;
                }));
    }


}
