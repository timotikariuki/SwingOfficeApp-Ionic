export class PaymentModel {

    constructor(
        public ID: number = null,
        public Date: string = '',
        public Amount: number = null,
        public Concept: string = '',
        public Notes: string = '',
        public IncomeTypeID: number = null,
        public Paid: number = null,
        public Account: string = ''
    ) {}

}
