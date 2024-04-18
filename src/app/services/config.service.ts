import { Injectable } from '@angular/core';

import configFile from "../config/config.json";

import { ConfigurationModel } from "../models/configuration.model";

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    config = configFile;
    configuration = ConfigurationModel;



    constructor() {
        console.log(this.config);
        console.log(this.configuration)
    }


    public getConfig() {
        return this.configuration; // ToDo: Asignar los valores de la escuela en concreto a esta variable configuration
    }

    public getConfFile() {
        return this.config;
    }

    public getUrlImages() {
        return this.config.url.images;
    }

    public getUrlImagesSlash() {
        return this.config.url.images_slash;
    }

    public getUrlS3() {
        return this.config.url.s3;
    }

    public getLang() {
        return this.config.lang;
    }

    public getLogosHeader() {
        return this.config.logos.header_app;
    }

    public getLogosHeaderGeneric() {
        return this.config.generic.logos.header_app;
    }

    public getLogoLogin() {
        return this.config.logos.logo_login;
    }

    public getLogoHorizontal() {
        return this.config.logos.logo_horizontal;
    }

    public getMailSchool() {
        return this.config.mail_school;
    }

    public getMailSchoolGeneric() {
        return this.config.generic.mail_school;
    }

    public getLogoLoginGeneric() {
        return this.config.generic.logos.logo_login;
    }

    public getSubFolder() {
        return this.config.sub_folder;
    }

    public getSchool() {
        return this.config.school;
    }

    public getSchoolName() {
        return this.config.school_name;
    }

    public getSchoolNameGeneric() {
        return this.config.generic.school_name;
    }

    public getUrlServices() {
        return this.config.url.services;
    }

    public isGenericApp():boolean {
        return this.config.generic_app;
    }

    public getPrefixImageNews() {
        return this.config.url.s3 + this.config.sub_folder + this.config.url.images + this.config.url.news_slash;
    }

    public getPrefixImageCommercials() {
        return this.config.url.s3 + this.config.sub_folder + this.config.url.images + this.config.url.news_slash;
    }

    public getPrefixImageContact( route: string ) {
        return this.config.url.s3 + this.config.sub_folder + this.config.url.images + route;
    }

    public wantTaxiOption() {
        return this.config.settings.wantTaxiOption;
    }

    public wantPaymentsOptionLeft() {
        return this.config.settings.wantPaymentsOptionLeft;
    }

    public wantPaymentsOptionBottom() {
        return this.config.settings.wantPaymentsOptionBottom;
    }

}
