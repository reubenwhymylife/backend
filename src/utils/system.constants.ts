import dotenv from "dotenv";
import { CustomError } from "../middleware/error.moddleware";
import { Reasons } from "./CustomReasons";

dotenv.config();
export const isDev = process.env.NODE_ENV !== "production";

const requiredEnvs = [
  // "DB_NAME",
  // "DB_USER",
  // "DB_PASS",
  "NODE_ENV",
  // "DB_HOST_STAGING",
] as const;
interface Envs {
  [key: string]: string;
}

const envs: Envs = requiredEnvs.reduce((acc: Envs, key: string) => {
  acc[key] = process.env[key] as string;
  return acc;
}, {});

const missingEnvs: string[] = requiredEnvs.filter((key) => !envs[key]);

if (missingEnvs.length > 0 || !process.env.PORT) {
  console.error("ENV Error, the following ENV variables are not set:");
  missingEnvs.push("PORT");
  console.table(missingEnvs);
  throw new CustomError({
    message: Reasons.customedReasons.ENV_NOT_FOUND,
    code: 500,
  });
}

export const PORT: number = Number(process.env.PORT);

export const { DB_NAME, DB_USER, DB_PASS, NODE_ENV, DB_HOST_STAGING } = envs;
