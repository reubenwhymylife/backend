"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailgun_js_1 = __importDefault(require("mailgun.js"));
const formdata_node_1 = require("formdata-node");
const ejs_1 = __importDefault(require("ejs"));
const Mailgun = new mailgun_js_1.default(formdata_node_1.FormData);
const apiKey = "79cd582fcf6a288066a8933206d9d4bb-0996409b-4b599784";
const domain = "sandboxd3935eebc91647b294d7f8134ba3685b.mailgun.org";
const client = Mailgun.client({
    username: "api",
    key: apiKey,
});
// host: "smtp.elasticemail.com",
// service: "gmail",
const transporter = nodemailer_1.default.createTransport({
    host: "mail.privateemail.com",
    port: 465, // or 25 or 465
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    },
});
const sendEmail = (emailDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (emailDetails) {
            const htmlContent = yield ejs_1.default.renderFile(emailDetails.emailTemplate, {
                client_name: emailDetails.username,
                otp: emailDetails.otp,
                description: emailDetails.description,
            });
            const emailOptions = {
                // from: {
                //   name: "WHYMYLIFE",
                //   // address: "abrahamjude1999@gmail.com",
                //   // address: "whymylife@mailslurp.net",
                // },
                from: "WHYMYLIFE <info@whymylife.me>",
                to: emailDetails.to,
                subject: emailDetails.subject,
                html: htmlContent,
            };
            yield transporter.sendMail(emailOptions);
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendEmail = sendEmail;
