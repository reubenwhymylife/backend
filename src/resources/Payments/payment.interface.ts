import { TxnStatus } from "./payment.model";

export enum paymentType {
  SUBSCRIPTION = "subscription",
  PURPOSEPLAN = "purpose-plan",
}

export interface IPayment {
  type: string,
  email:string,
  amount: number,
  transactionStatus:TxnStatus,
  userId:string
}