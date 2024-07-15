"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("./utils/logger"));
const connection_1 = __importDefault(require("./configs/connection"));
const system_constants_1 = require("./utils/system.constants");
const routes_1 = __importDefault(require("./routes"));
const sendEmail_1 = require("./utils/sendEmail");
sendEmail_1.sendEmail;
const dbUrl = process.env.DB_URL;
const app = new _1.default(system_constants_1.PORT, routes_1.default);
dotenv_1.default.config();
app.start();
const DatabseConnect = new connection_1.default(logger_1.default);
if (dbUrl !== undefined) {
    DatabseConnect.connect(dbUrl);
}
