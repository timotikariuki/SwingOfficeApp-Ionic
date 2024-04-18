export class ContactModel {


    constructor(
        public ID: number = null,
        public Photo: string = '',
        public Name: string = '',
        public Surname: string = '',
        public Surname2: string = '',
        public Mail: string = '',
        public Phone: string = '',
        public Phone2: string = '',
        public Direction: string = '',
        public PostalCode: string = '',
        public Town: string = '',
        public Country: string = '',
        public Zone: string = '',
        public Fax: string = '',
        public Web: string = '',
        public DNI: string = '',
        public BirthDay: string = '',
        public StartDate: string = '',
        public PaymentMethodID: number = 1,
        public ContactStatusID: number = 1,
        public CreatedAt: string = '',
        public UpdatedAt: string = '',

        public token: string = '',
        public school: string = ''

    ) {}

}
