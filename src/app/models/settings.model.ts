import { LanguageModel } from "./language.model";

export class SettingsModel {

    constructor(
        public wantTaxi: boolean = true,
        public wantPaymentsInLeftMenu: boolean = true,
        public wantPaymentsInTabsMenu: boolean = false,
        public language: LanguageModel = new LanguageModel(),
    ) {}
}
