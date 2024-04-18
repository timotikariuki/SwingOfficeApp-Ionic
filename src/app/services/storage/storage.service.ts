import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

import { AuthService } from "../auth/auth.service";
import { ConfigService } from "../config.service";

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    ContactID: number = null;
    school: string = '';
    SchoolName: string = '';
    SubFolder: string = '';
    Token: string = '';
    Teacher: boolean;
    mailSchool: string = '';
    lang: string = 'en';
    isLoggedIn: boolean = false;


    constructor(
        public storage: Storage,
        public _auth: AuthService,
        public _cs: ConfigService
    ) {
        this.loadStorage();
    }



    saveStorage(data) {
        console.log(data);
        return this.storage.ready()
            .then(() => {
                this.storage.set('appToken', data.token);
                this.storage.set('appContactId', data.contactid);
                this.storage.set('appTeacher', data.isteacher);
                this.storage.set('appSchool', data.school);
                this.storage.set('appSchoolName', data.schoolname);
                this.storage.set('appMailSchool', data.mailSchool);
                this.storage.set('appLanguage', data.language);
                this.storage.set('appLanguageCode', data.languagecode);
                this.storage.set('appSubfolder', data.subfolder);
                this.storage.set('appSubdomain', data.subdomain);
                this.storage.set('appIsLoggedIn', data.isloggedin);
            })
            .catch(() => {});
    }

    resetStorage() {
        return this.storage.ready()
            .then(() => {
                this.storage.remove('appToken');
                this.storage.remove('appContactId');
                this.storage.remove('appTeacher');
                this.storage.remove('appSchool');
                this.storage.remove('appSchoolName');
                this.storage.remove('appMailSchool');
                this.storage.remove('appLanguage');
                this.storage.remove('appLanguageCode');
                this.storage.remove('appSubfolder');
                this.storage.remove('appSubdomain');
                this.storage.remove('appIsLoggedIn');
            });
    }


    public loadStorage() {
        return this.getFromLocal()
            .then(() => {})
            .catch(() => {});
    }


    public getFromLocal() {
        return this.storage.ready()
            .then((data) => {
                console.log('en el .then del getFromLocal: ');
                console.log(data);
                // this.storage.keys().then((data)=>console.log(data));

                return this.storage.get('appToken').then(
                    data => {
                        console.log(data);
                        if ( data ) {
                            this.Token = data;
                            console.log('hay token:' + this.Token);

                            return this.storage.get('appContactId').then(
                                data => {
                                    console.log(data);
                                    if ( data ) {
                                        this.ContactID = data;
                                        console.log('hay contactid:' + this.ContactID);
                                        // return ContactID;

                                        return this.storage.get('appSchool').then(
                                            (data: any) => {
                                                console.log(data);
                                                if ( data ) {
                                                    this.school = data;
                                                    console.log('hay school: ' + this.school);

                                                    // return school
                                                } else {
                                                    console.log('no hay school');
                                                }

                                                return this.storage.get('appTeacher').then(
                                                    (data: any) => {
                                                        console.log(data);
                                                        if (data) {
                                                            this.Teacher = data;
                                                            console.log('Es Teacher???: ' + this.Teacher);

                                                            // return teacher
                                                        } else {
                                                            this.Teacher = false;
                                                            console.log('no sabemos ei es Teacher', this.Teacher, this.isTeacher());
                                                        }

                                                        return this.storage.get('appMailSchool').then(
                                                            (data: any) => {
                                                                console.log(data);
                                                                if (data) {
                                                                    this.mailSchool = data;
                                                                    console.log('hay MailSchool: ' + this.mailSchool);
                                                                    // return Mail School
                                                                } else {
                                                                    console.log('no hay MailSchool');
                                                                }

                                                                return this.storage.get('appLanguage').then(
                                                                    (data: any) => {
                                                                        console.log(data);
                                                                        if (data) {
                                                                            this.lang = data;
                                                                            console.log('hay Language: ' + this.lang);
                                                                            // return Language
                                                                        } else {
                                                                            console.log('no hay Language');
                                                                        }

                                                                        return this.storage.get('appIsLoggedIn').then(
                                                                            (data: any) => {
                                                                                console.log(data);
                                                                                if (data) {
                                                                                    this.isLoggedIn = data;
                                                                                    if (this.isLoggedIn && this.school === this._cs.getSchool()) {
                                                                                        console.log('ESTÁ LOGUEAD@? ' + this.isLoggedIn );
                                                                                        this._auth.setLoggedIn(data);
                                                                                    } else {
                                                                                        this._auth.setLoggedIn(false);
                                                                                        this.resetStorage();
                                                                                    }
                                                                                } else {
                                                                                    this._auth.setLoggedIn(false);
                                                                                    console.log('no sabemos si está loguead@');
                                                                                }
                                                                            }
                                                                        )
                                                                            .catch(() => {
                                                                            });

                                                                    }
                                                                )
                                                                    .catch(() => {
                                                                    });


                                                            }
                                                        )
                                                            .catch(() => {
                                                            });

                                                    });


                                            }
                                        )
                                            .catch(() => {});

                                    } else {
                                        console.log('no hay contactid');
                                    }
                                }
                            )
                                .catch(() => {});

                        } else {
                            console.log('no hay token');
                        }

                    } // .then()
                )
                    .catch(() => {});

            })
            .catch(() => {});
    }



    // ************* //
    // ** Getters ** //
    // ************* //


    public getLang() {
        return this.storage.get('appLanguageCode');
    }


    public getSchool() {
        // this.storage.get('appSchool').then((data: any) => { return data; }).catch(() => { return false; });
        return this.storage.get('appSchool');
    }

    public getSchoolName() {
        // this.storage.get('appSchoolName').then((data: any) => { return data; }).catch(() => { return false; });
        return this.storage.get('appSchoolName');
    }

    public getSubfolder() {
        // this.storage.get('appSubfolder').then((data: any) => { return data; }).catch(() => { return false; });
        return this.storage.get('appSubfolder');
    }

    public getIsTeacher() {
        // this.storage.get('appSubfolder').then((data: any) => { return data; }).catch(() => { return false; });
        return this.storage.get('appTeacher');
    }

    public getContactId() {
        // this.storage.get('appSchool').then((data: any) => { return data; }).catch(() => { return false; });
        return this.storage.get('appContactId');
    }

    public getToken() {
        // this.storage.get('appSchool').then((data: any) => { return data; }).catch(() => { return false; });
        return this.storage.get('appToken');
    }

    public getTokenProp() {
        return this.Token;
    }

    public getContactIdProp() {
        return this.ContactID;
    }

    public getSchoolProp() {
        return this.school;
    }

    public getSchoolNameProp() {
        return this.SchoolName;
    }

    public getIsLoggedInProp() {
        return this.isLoggedIn;
    }

    public getIsTeacherProp() {
        return this.Teacher;
    }

    public isSubfolderStored(): Promise<boolean> {
        return this.getSubfolder().then(() => { return true; }).catch(() => { return false; })
    }

    public isSchoolStored(): Promise<boolean> {
        return this.getSchoolName().then(() => { return true; }).catch(() => { return false; })
    }

    public isSchoolNameStored(): Promise<boolean> {
        return this.getSchoolName().then(() => { return true; }).catch(() => { return false; })
    }

    public isTeacher() {
        return this.getSchoolName().then(() => { return true; }).catch(() => { return false; })
    }


    IsLoggedIn(): Promise<boolean> {
        // return (this.school && this.SubFolder && this.SchoolName ) ? true : false;
        // return (this.getSchool().then && this.getSubfolder() && this.getSchoolName() ) ? true : false;

        return ( this.isSubfolderStored() && this.isSchoolNameStored() && this.isSchoolStored() ) ;

        // return this.getSchool().then(() => {
        //     this.getSchoolName().then( () => {
        //         this.getSubfolder().then( () => {
        //             return true;
        //         }).catch(() => { return false });
        //     }).catch(() => { return false });
        // }).catch(() => { return false; });
    }


    // public IsTeacher() {
    //     this.storage.get('appTeacher')
    //         .then((data: boolean) => {
    //             return data;
    //         }).catch(() => { return false; });
    // }


    public IsLocalStorage() {

        return this.loadStorage()
            .then(() => {
                if ( this.Token && this.ContactID && this.school) {
                    return true;
                } else {
                    return false;
                }
            })
            .catch(() => {});
    }




    // ************* //
    // ** Setters ** //
    // ************* //




}
