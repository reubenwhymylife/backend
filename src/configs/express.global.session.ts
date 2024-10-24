export enum RememberMe {
  NO,
  YES,
}
declare module "express-session" {
  export interface SessionData {
    sid?: string;
    expires?: Date;
    data?: string;
    firstName?: string;
    lastName?: string;
    DeviceName?: string;
    Platform?: string;
    PlatformVersion?: string;
    isRememberMe?: RememberMe;
    userId?: number;
    isAuthenticated?: boolean;
  }
}


