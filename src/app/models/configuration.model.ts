export class ConfigurationModel {

    constructor(
        public subFolder: string = '',
        public SchoolName: string = '',
        public school: string = '',
        public url: string = '',
        public token: string = '',
        public contactId: number | null = null,
        public mailSchool: string = '',
        public lang: string = 'en'
    ) {}

}
