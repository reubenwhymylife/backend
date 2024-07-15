export interface WHYMYLIFE_REG_DTO {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  isVerified?: boolean;
  role?: string | Roles;
  terms?: boolean;
  payments?: [string];
  subscriptions?: [string];
  purposes?: [string];
  isDisabled?:boolean
}
export interface emailDetails {
  to: string;
  subject: string;
  otp: any;
  username: string;
  emailTemplate: any;
  description?: string;
}

export interface verifyOtp {
  email: string;
  otpCode: any;
}
interface forMe {
  noOfMonth: number;
  renewable: boolean;
}
interface forOthers {
  noOfMonth: number;
  renewable: boolean;
}
export interface Subs {
  forMe: forMe;
  forOthers: forOthers;
  totalCost: string;
}
export enum Roles {
  USER = "user",
  ADMIN = "admin",
}
