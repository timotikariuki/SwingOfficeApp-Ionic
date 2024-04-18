import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import { catchError, map } from 'rxjs/operators';

import { AlertController, LoadingController, Platform, ToastController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
// import { Toast } from "@ionic-native/toast/ngx";


// Import Config Data
// import config from "../../config/config.json";

// Models
import { DataUserModel } from "../../models/DataUser.model";
import { UserModel } from "../../models/user.model";
import { NewsModel } from "../../models/news.model";
import { AttendanceModel } from "../../models/attendance.model";

// Services
import { StorageService } from "../storage/storage.service";
import { ConfigService } from "../config.service";
import { AuthService } from "../../auth/auth.service";
import { CommercialModel } from "../../models/commercial.model";

@Injectable({
    providedIn: 'root'
})
export class DataUserService {

    public _user = new BehaviorSubject<DataUserModel>(new DataUserModel());

    public news: NewsModel;
    public newsList: NewsModel[] = [];
    // private confFileURL = 'https://s3-eu-central-1.amazonaws.com/swingoffice.public/tandem_34530EWR34iLw5618/cnfig/config.json';

    public LoggedIn: boolean; // ToDo: sacar la info del localstorage
    public Teacher: string; // ToDo: sacar la info del localstorage
    public SchoolName: string = '';
    public subFolder: string = '';
    public school = '';

    public pendingReceipts = 0;

    public attend = true;

    url: string;
    urlImgStudents: string;

    public pruebas: DataUserModel;

    public data: any;
    public User: UserModel;
    public dataUser: DataUserModel;
    public isLoading = false;

    public teachersList: object;
    public lessonsList: object;
    public assistanceList: AttendanceModel[];

    // Local Storage
    public Token: string;
    public ContactID: string;
    public mailSchool: string;
    public lang: string;

    constructor(
        public http: HttpClient,
        public _auth: AuthService,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public platform: Platform,
        public storage: Storage,
        public toastCtrl: ToastController,
        public _ss: StorageService,
        public _cs: ConfigService,
    ) {

        this._auth.getUser().pipe().subscribe(user => {
            this.User = user;

            this.loadDataUser()
                .subscribe( (data: any) => {
                        console.log('data: ', data);
                        this._user.next(data);
                    },
                    error => {
                        console.log('error: ', error);
                        console.log('status: ', error.status);
                        if (error.status == 401) {
                            this.storage.clear();
                        }

                    });
        });

        this.url = this._cs.getUrlServices();
        this.urlImgStudents = this._cs.getUrlImagesSlash();

        this.getDataUserStatus().pipe().subscribe(DataUser => {
            console.log('%%%%%%%%%%%%%% DataUser en constructor del DataUser: ', DataUser);
            this.dataUser = DataUser;
            this.pendingReceipts = DataUser.payments.pendingReceipts;
        });

    }


    public getDataUserStatus() {
        return this._user.asObservable();
    }

    public resetDataUserStatus() {
        this._user.next(new DataUserModel());
    }

    setConfiguration() {
        console.log('en setConfiguration()');

        if (!this._cs.isGenericApp()) { // App for concrete School
            this.subFolder = this._cs.getSubFolder();
            this.SchoolName = this._cs.getSchoolName();
            this.school = this._cs.getSchool();
            this.mailSchool = this._cs.getMailSchool();

        } else {  // Generic App

            this.storage.get('appSubfolder')
                .then((data: any) => {
                    this.subFolder = data;
                    console.log('appSubfolder: ', this.subFolder);
                }).catch(() => {});

            this.storage.get('appSchool')
                .then((data: any) => {
                    this.school = data;
                    console.log('appSchool: ', this.school);
                }).catch(() => {});

            this.storage.get('appSchoolName')
                .then((data: any) => {
                    this.school = data;
                    console.log('appSchoolName: ', this.school);
                }).catch(() => {});

            this.mailSchool = this._cs.getMailSchoolGeneric();

        }


    }


    // getVideoToShow(coursecode, lessoncode) {
    //
    //     console.log('type de videosList: ', typeof this.dataUser.videosList[0])
    //
    //     const course = this.dataUser.videosList[0].find(
    //         course => course.CourseCode === coursecode);
    //
    //     const video = course.Videos.find(
    //         video => video.LessonCode === lessoncode);
    //
    //     return video;
    // }


    getImgURL(sector, img) {
        console.log('las subfolders de dus:  ****************** : ', this._cs.getSubFolder(),'---', this.User.subfolder);
        let subfolder = this._cs.getSubFolder();
        if(this.User.subfolder) {
            subfolder = this.User.subfolder;
        }
        // const image = this._cs.getUrlS3() + this._cs.getSubFolder() + this._cs.getUrlImagesSlash() + sector + img;
        const image = this._cs.getUrlS3() + subfolder + this._cs.getUrlImagesSlash() + sector + img;
        return image;
    }

    loadDataUser() {
        const url = this._cs.getUrlServices() + "app/data_user";
        const requestBody = {
            Token: this.User.token,
            ContactID: this.User.contactid,
            school: this.User.school
        };
        return this.http.post(url, requestBody);
    }


    logInApp(Mail, Password, School) {
        const url = this.url + "LoginApp/index";
        const requestBody = {
            Mail,
            Password,
            School
        };
        return this.http.post(url, requestBody);

    }


    saveSettings() {
        const url = this._cs.getUrlServices() + "app/data_user";
        const requestBody = {
            Token: this.User.token,
            ContactID: this.User.contactid,
            school: this.User.school
        };
        return this.http.post(url, requestBody);
    }


    saveNotifyFault(faultClass) {
        console.log(faultClass);
        console.log(this.dataUser);
        // ToDo: Sustituir el texto por el texto de cada escuela en el seu idioma
        const requestBody = {
            Token: this.User.token,
            ContactID: this.User.contactid,
            school: this.User.school,
            language: this.User.languagecode,
            DancerID: faultClass.DancerID,
            ClassID: faultClass.ClassID,
            // Para el envío de mail:
            Contact_ID: this.User.contactid,
            ContactMail: this.dataUser.contact.Mail,
            mailschool: this.User.mailschool,
            schoolName: this.User.schoolname,
            logoSchool: this._cs.getLogoHorizontal(),
            ContactName: this.dataUser.contact.Name,
            subject: "Petición de Ausencia desde la App",
            message: this.dataUser.contact.Name + " " + this.dataUser.contact.Surname + " " + this.dataUser.contact.Surname2 +
                " ha notificado ausencia para la clase de " + faultClass.EditionName + " del " + faultClass.Date + " a las " + faultClass.Hour + ".",
        };

        console.log(requestBody);
        const url = this.url + "app/notifyfault";
        return this.http.post(url, requestBody)
            .subscribe(
                (data: any) => {
                    console.log('data: ', data);
                    this.presentToast(data.message, 'SUCCESS!', 'success');

                    this.loadDataUser();
                },
                (error: any) => {
                    console.log('error: ', error);
                    this.presentToast('ERROR ' + error.status + ' - ' + error.error.error.message, 'ERROR!', 'danger');
                });
    }



    meApuntoDeTaxi(taxi) {
        const requestBody = {
            Token: this.User.token,
            ContactID: this.User.contactid,
            school: this.User.school,
            language: this.User.languagecode,
            // Para el envío de mail:
            Contact_ID: this.User.contactid,
            ContactMail: this.dataUser.contact.Mail,
            ContactName: this.dataUser.contact.Name,
            mailschool: this.User.mailschool,
            schoolName: this.User.schoolname,
            logoSchool: this._cs.getLogoHorizontal(),
    // ToDo: substituir el texto del mail al idioma correspondiente a la escuela
            subject: "Petición de Taxi desde la App",
            message: this.dataUser.contact.Name + " " + this.dataUser.contact.Surname + " " + this.dataUser.contact.Surname2 +
                " se apunta de Taxi hoy a " + taxi.EditionName + ".",
            Taxi: taxi
        };

        console.log(requestBody);
        const url = this.url + "app/meapuntodetaxi";
        return this.http.post(url, requestBody)
            .subscribe(
                (data: any) => {
                    console.log('data: ', data);
                    this.presentToast(data.message, 'SUCCESS!', 'success');
                    this.loadDataUser();
                },
                (error: any) => {
                    console.log('error: ', error);
                    this.presentToast('ERROR ' + error.status + ' - ' + error.error.error.message, 'ERROR!', 'danger');
                });
    }




    getRescheduleClass(data: any) {
        console.log(data);
        const requestBody = {
            Token: this.User.token,
            ContactID: this.User.contactid,
            school: this.User.school,
            language: this.User.languagecode,
            CourseEditionID: data.CourseEditionID,
            DanceLevelID: data.DanceLevelID,
            DisciplineID: data.DisciplineID,
            CourseTypeID: data.CourseTypeID
        };

        console.log(requestBody);
        const url = this.url + "app/getClassesReschedule";
        return this.http.post(url, requestBody);
    }



    saveAttendance(list, lessonTaught, teachers, courseID, classID) {
        const requestBody = {
            Token: this.User.token,
            ContactID: this.User.contactid,
            school: this.User.school,
            language: this.User.languagecode,
            AttendanceList: list,
            LessonTaught: lessonTaught,
            Teachers: teachers,
            CourseID: courseID,
            ClassID: classID
        };

        console.log(requestBody);
        const url = this.url + "app/saveattendance";
        return this.http.post(url, requestBody)
            .subscribe(
                (data: any) => {
                    console.log('data: ', data);
                    this.presentToast(data.message, 'SUCCESS!', "success");
                },
            (error: any) => {
                console.log('error: ', error);
                this.presentToast('ERROR ' + error.status + ' - ' + error.error.error.message, 'ERROR!', 'danger');
            });
    }


    async presentToast(msg, head, color) {
        console.log(color);
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: "top",
            header: head,
            color: color
        });
        toast.present();
    }


    saveReschedule(reschedule) {
        console.log(reschedule);
        const classDay = new Date(reschedule.newClassDay).toLocaleDateString();
        const requestBody = {
            Token: this.User.token,
            ContactID: this.User.contactid,
            school: this.User.school,
            language: this.User.languagecode,
            Reschedule: reschedule,
            // Para el envío de mail:
            Contact_ID: this.User.contactid,
            ContactMail: this.dataUser.contact.Mail,
            ContactName: this.dataUser.contact.Name,
            subject: "Petición de Recuperación desde la App",  // ToDo: Traducir
            message: this.dataUser.contact.Name + " " + this.dataUser.contact.Surname + " " + this.dataUser.contact.Surname2 +
                " ha pedido recuperar la clase de " + reschedule.oldEditionName + " del " + reschedule.oldDate + " a las " + reschedule.oldHour +
                " con la clase de <b>" + reschedule.newEditionName + " con " + reschedule.Teacher1 + " " + reschedule.Teacher2 + " el " + classDay + "</b>" // + reschedule.Date + " a las " + reschedule.Hour + ".",
        };

        const url = this.url + "app/savereschedule";
        return this.http.post(url, requestBody)
            .subscribe(
                (data: any) => {
                    console.log('data: ', data);
                    this.presentToast(data.message, 'SUCCESS!', "success");
                    this.loadDataUser();
                },
                (error: any) => {
                    console.log('error: ', error);
                    this.presentToast('ERROR ' + error.status + ' - ' + error.error.error.message, 'ERROR!', 'danger');

                });
    }






    getAllNews() {
        console.log('getAllNews desde el servicio data-user, con la escuela del user:', this.User.school);

        let school = this._cs.getSchool();
        if(this.User.school) {
            school = this.User.school;
        }
        const url = this.url + "app/show_news/" + school;
        console.log(url);

        return this.http.get( url )
            .pipe(map((resp: any) => {
                    return resp;
                }),
                catchError( ( err ) => {
                    console.log('Error recibiendo las noticias: ');
                    console.log(err);
                    return Observable.prototype;
                }));
    }



    getPayments() {
        const url = this.url + "app/getStudentPayments";
        const requestBody = {
            Token: this.User.token,
            ContactID: this.User.contactid,
            school: this.User.school,
            language: this.User.languagecode
        };

        return this.http.post(url, requestBody)
            .pipe(map((data:any) => {
                console.log(data);
                // this.assistanceList = this.data.assistanceList;
                return data.payments;
            }));

    }



    getCommercials() {
        const url = this.url + "app/commercials";
        const requestBody = {
            Token: this.User.token,
            ContactID: this.User.contactid,
            school: this.User.school,
            language: this.User.languagecode
        };

        return this.http.post(url, requestBody)
            .pipe(map((data:any) => {
                console.log(data);
                if (data.error) {
                    return [];
                }
                return data.commercials;
            }));

    }



    getMyCommercials() {
        const url = this.url + "app/myCommercials";
        const requestBody = {
            Token: this.User.token,
            ContactID: this.User.contactid,
            school: this.User.school,
            language: this.User.languagecode
        };

        return this.http.post(url, requestBody)
            .pipe(map((data:any) => {
                console.log(data);
                if (data.error) {
                    return [];
                }
                return data.MyCommercials;
            }));

    }



    saveMyCommercial(commercial: CommercialModel) {
        const url = this.url + "app/saveMyCommercial";
        const requestBody = {
            Token: this.User.token,
            ContactID: this.User.contactid,
            school: this.User.school,
            language: this.User.languagecode,
            data: commercial
        };

        return this.http.post(url, requestBody)
            .pipe(map((data:any) => {
                return data;
            }));

    }



    editMyCommercial(commercial: CommercialModel) {
        const url = this.url + "app/editMyCommercial";
        const requestBody = {
            Token: this.User.token,
            ContactID: this.User.contactid,
            school: this.User.school,
            language: this.User.languagecode,
            data: commercial
        };

        return this.http.post(url, requestBody)
            .pipe(map((data:any) => {
                return data;
            }));

    }


    getAssistanceList(ID: number, classDate: string) {
        const url = this.url + "app/assistance_list";
        const requestBody = {
            Token: this.User.token,
            ContactID: this.User.contactid,
            school: this.User.school,
            language: this.User.languagecode,
            CourseEditionID: ID,
            classDate
        };

        return this.http.post(url, requestBody)
            .pipe(map((data:any) => {
                console.log(data);
                console.log(data.teachersWhoTaught);
                this.data = data;
                this.assistanceList = this.data.assistanceList;
                this.teachersList = this.data.teachersList;
                this.lessonsList = this.data.lessons;

                return data;
            }));

    }



    uploadCropedPhoto( Type: string, base64CroppedImg: string, Photo: string = '' ) {
        const url = this.url + "app/upload_photo";
        const requestBody = {
            Token: this.User.token,
            ContactID: this.User.contactid,
            school: this.User.school,
            subfolder: this.User.subfolder,
            language: this.User.languagecode,
            Type: Type,                       // Type = enum('contact' | 'commercials')
            Photo: Photo,
            base64Img: base64CroppedImg
        };

        return this.http.post(url, requestBody)
            .pipe(map((data:any) => {
                console.log(data);

                if (Type == 'contact' && !data.error && !data.resp.error && !data.resp.newName.error) {
                    this.dataUser.contact.Photo = data.photo;
                }
                return data;
            }));

    }



    // **** SEARCH **** //
    searchLessons( search: string, CourseEditionID: number ) {
        const url = this.url + "app/searchLessons";
        const requestBody = {
            Token: this.User.token,
            ContactID: this.User.contactid,
            CourseEditionID: CourseEditionID,
            school: this.User.school,
            search: search
        };
        console.log(url);

        return this.http.post(url, requestBody)
            .pipe(map((data:any) => {
                console.log(data);
                return data;
            }));
    }



    // loadTaxisNeeded() {
    //     const url = this.url + "app/assistance_list";
    //     const requestBody = {
    //         Token: this.User.token,
    //         ContactID: this.User.contactid,
    //         school: this.User.school,
    //         language: this.User.languagecode
    //     };
    //     // ToDo: Esta función no hace nada: se envia a assistanc_list, pero el retorn no hace nada
    //     return this.http.post(url, requestBody)
    //         .subscribe( data => {
    //             console.log("servicio TaxisNeeded _dus");
    //             console.log(data);
    //             // this.dataTaxis = data;
    //             // this.assistanceList = this.data.;
    //             // this.teachersList = this.data.teachersList;
    //             // this.assistanceList.HasAttended = this.assistanceList.HasAttended ? true : false;
    //             // console.log(this.assistanceList);
    //         }),
    //         error => {
    //             console.log(error);
    //         };
    // }



    doRefresh(refresher) {
        this.loadDataUser()
            .subscribe((data: any) => {
                console.log(data);
                refresher.complete();
                console.log(' ^^^^^^^^^^^^^^^^^ Async operation has ended');
            });

    }





    isLoggedIn() {
        if ( this._ss.getTokenProp() && this.ContactID && this.school && this.LoggedIn === true) {
            return true;
        } else {
            return false;
        }
    }

    setLoggedIn(logged: boolean) {
        this.LoggedIn = logged;
    }

    isTeacher() {
        return this.Teacher;
    }

    setTeacher(isteacher) {
        this.Teacher = isteacher;
        this.storage.set('appTeacher', isteacher);
    }

    getSchoolName() {
        return this.SchoolName;
    }

    getPendingReceipts() {
        return this.pendingReceipts ;
    }


    // ***************** //
    // **** Setters **** //
    // ***************** //

    setDataUser(data) {
        this.dataUser = data;
    }

    setIsTeacher(isTeacher) {
        this.Teacher = isTeacher;
    }


}
