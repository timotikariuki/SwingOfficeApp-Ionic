import { PaymentModel } from "./payment.model";

export class PaymentsModel {

    constructor(
        public pendingCharges: number = 0.00,
        public pendingReceipts: number = 0,
        public cashs: PaymentModel[] = [new PaymentModel()]
    ) {}

}
