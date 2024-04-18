export class CommercialModel {

    constructor(
        public ID: number = null,
        public ContactID: number = null,
        public Company: string = '',
        public Image: string = '',
        public Slogan: string = '',
        public Description: string = '',
        public UserName: string = '',
        public UserImage: string = '',
        public Mail: string = '',
        public Phone: string = '',
        public Web: string = '',
        public VideoURL: string = '',
        public Tags: string[] = [''],
        public isPublished: boolean = false,
        public acceptedConditions: boolean = false
    ) {}
}
