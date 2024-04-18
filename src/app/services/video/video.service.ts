import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from "rxjs/operators";
import { Observable } from "rxjs";

import { MediaFile } from '@ionic-native/media-capture/ngx';
import { File, FileEntry } from "@ionic-native/file/ngx";
import { ToastController } from "@ionic/angular";
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

// Models
import { VideoLessonModel } from "../../models/video-lesson.model";

// Services
import { ConfigService } from "../config.service";
// import { stringify } from "querystring";


@Injectable({
    providedIn: 'root'
})
export class VideoService {

    subURL = 'app/';

    constructor(
        public toastCtrl: ToastController,
        public _cs: ConfigService,
        public http: HttpClient,
        public file: File,
        // private fileTransfer: FileTransfer
    ) { }


    // readFile(file: any) {
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //         const formData = new FormData();
    //         const imgBlob = new Blob([reader.result], {
    //             type: file.type
    //         });
    //         formData.append('file', imgBlob, file.name);
    //         this.uploadImageData(formData);
    //     };
    //     reader.readAsArrayBuffer(file);
    // }


    // Ok
    uploadVideo( mediaFile: Blob, lesson: VideoLessonModel, VideoID ) {

        console.log('en uploadVideo() del service Video.Service');
        console.log("mediaFile: ", mediaFile);
        console.log("mediaFile.fullPath: ", mediaFile);
        console.log("lesson: ", lesson);

        return this.pruebasUpload(mediaFile, lesson, VideoID);


    }


    // Ok
    pruebasUpload(fileBlob: Blob, lesson: VideoLessonModel, VideoID ) {
        console.log('!!!!!!!!!!!!!! %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% ****************** ************** *****************');

        console.log(JSON.stringify(lesson));
        return new Promise(async (resolve, reject) => {

            console.log('XXXXXXXXXXXXXXX %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');

            // const path = f.nativeURL.substr(0, f.nativeURL.lastIndexOf('/') + 1);
            // const type = this.getMimeType(f.name.split('.').pop());
            // const buffer = await this.file.readAsArrayBuffer(path, f.name);
            // const fileBlob = new Blob([buffer], type);
            const randomId = Math.random()
                .toString(36)
                .substring(2, 8);

            console.log('EL RANDOM ID NAME: ------------------------->', randomId);

            // const formDataVideo = new FormData();
            const formDataVideo = new FormData();
            const xhrVid = new XMLHttpRequest();

            formDataVideo.append('ID', VideoID);
            formDataVideo.append('Name', lesson.ClassName);
            // formDataVideo.append('Video', fileBlob, randomId);
            formDataVideo.append('Video', fileBlob, lesson.MediaName);
            formDataVideo.append('VideoID', lesson.VideoID.toString());
            formDataVideo.append('LessonID', lesson.LessonID.toString());
            formDataVideo.append('Published', 'true');
            formDataVideo.append('LessonCode', lesson.LessonCode);
            formDataVideo.append('LessonName', lesson.LessonName);
            formDataVideo.append('ContactID', lesson.ContactID);
            formDataVideo.append('CourseEditionID', lesson.CourseEditionID.toString());
            formDataVideo.append('action', lesson.Type);  //  ['create' || 'update']
            formDataVideo.append('Token', lesson.Token);
            formDataVideo.append('school', lesson.school);
            formDataVideo.append('subfolder', this._cs.getSubFolder());
            formDataVideo.append('url_public', this._cs.getUrlS3());


            xhrVid.onreadystatechange = () => {
                if (xhrVid.readyState === 4) {
                    if (xhrVid.status === 200) {
                        console.log('Video Uploaded ! ! ! ! ! ! ! ! ! ! !');
                        console.log(xhrVid.response);
                        const data = JSON.parse(xhrVid.response);

                        this.presentToast(xhrVid.response.message, 'SUCCESS!', 'success');
                        resolve(xhrVid.response);
                        // resolve(JSON.parse(xhrVid.response));
                    } else {
                        console.log('Ups! Upload Failed... . . . . . . . . . . .  ');
                        this.presentToast(xhrVid.status + ' - ' + xhrVid.statusText + ' - ' + xhrVid.responseText , 'ERROR!', 'danger');
                        reject(xhrVid.response);
                    }
                }
            };

            const url = this._cs.getUrlServices() + 'app/upload/';

            xhrVid.open('POST', url, true);
            xhrVid.send(formDataVideo);
        });
    }


    getMimeType(fileExt) {
        if (fileExt == 'wav') { return { type: 'audio/wav' }; } else if (fileExt == 'jpg') { return { type: 'image/jpg' }; } else if (fileExt == 'mp4') { return { type: 'video/mp4' }; } else if (fileExt == 'MOV') { return { type: 'video/quicktime' }; }
    }


    // Ok
    create( VideoLesson: VideoLessonModel ) {
        console.log('En create del Video Service: ');
        console.log(VideoLesson);

        const url = this._cs.getUrlServices() + this.subURL + 'video_create/';

        return this.http.post( url, VideoLesson )
            .pipe(map((resp: any) => {
                    console.log('respuesta del post de video_create:');
                    console.log(resp);
                    return resp;
                }),
                catchError( ( err ) => {
                    console.log('Error del post de video_create:');
                    console.log(err);
                    return Observable.prototype;
                }));
    }


    update( VideoLesson: VideoLessonModel ) {
        console.log('En update del Video Service: ');
        console.log(VideoLesson);

        const url = this._cs.getUrlServices() + this.subURL + 'video_update/';

        console.log(VideoLesson);
        return this.http.post( url, VideoLesson )
            .pipe(map((resp: any) => {
                    console.log(resp);
                    return resp;
                }),
                catchError( ( err ) => {
                    console.log(err);
                    return Observable.prototype;
                }));
    }


    // Ok
    async presentToast(msg, head, color) {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: "top",
            header: head,
            color: color
        });
        toast.present();
    }



}
