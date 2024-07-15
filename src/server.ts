import App from ".";
import dotenv from "dotenv";
import logger from "./utils/logger";
import dbInit from "./configs/connection";
import { PORT } from "./utils/system.constants";
import routes from "./routes";
import { sendEmail } from "./utils/sendEmail";
sendEmail;
const dbUrl = process.env.DB_URL;
const app = new App(PORT, routes);
dotenv.config();
app.start();
const DatabseConnect = new dbInit(logger);
if (dbUrl !== undefined) {
  DatabseConnect.connect(dbUrl);
}
