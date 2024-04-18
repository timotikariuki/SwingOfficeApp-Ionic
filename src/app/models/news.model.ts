export class NewsModel {

    constructor(
        public id: number = null,
        public order: number = null,
        public title: string = '',
        public subtitle: string = '',
        public description: string = '',
        public photo: any = null,
        public url: string = '',
        public active: boolean = false,
        public photo_url: string = '',
        public created_at: string = '',
        public updated_at: string = '',

        public token: string = '',
        public school: string = ''
    ) {}

}
