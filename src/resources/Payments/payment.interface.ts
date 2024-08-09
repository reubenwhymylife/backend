import { TxnStatus } from "./payment.model";

export enum paymentType {
  SUBSCRIPTION = "subscription",
  PURPOSEPLAN = "purpose-plan",
  DAILYMESSAGE = "daily-message",
  CONTENTPAYMENT = "content-payment"
}

export interface IPayment {
  type: string,
  email:string,
  amount: number,
  transactionStatus:TxnStatus,
  userId:string
}