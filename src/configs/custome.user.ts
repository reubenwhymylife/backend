import { WHYMYLIFE_REG_DTO } from "../resources/Signup/Signup.interface";

declare global {
  namespace Express {
    export interface Request {
      WHYMYLIFE: WHYMYLIFE_REG_DTO;
    }
  }
}
