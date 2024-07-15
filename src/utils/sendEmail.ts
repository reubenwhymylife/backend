import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
import mailgun from "mailgun.js";
import { FormData } from "formdata-node";
import ejs from "ejs";

const Mailgun = new mailgun(FormData);
const apiKey = "79cd582fcf6a288066a8933206d9d4bb-0996409b-4b599784";
const domain = "sandboxd3935eebc91647b294d7f8134ba3685b.mailgun.org";
const client = Mailgun.client({
  username: "api",
  key: apiKey,
});
// host: "smtp.elasticemail.com",
// service: "gmail",
const transporter = nodemailer.createTransport({
  host: "mail.privateemail.com",
  port: 465, // or 25 or 465
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});
interface emailDetails {
  from?: any;
  to: string;
  subject: string;
  html?: any;
  otp: any;
  username: string;
  description?: string;
  emailTemplate: any;
}

export const sendEmail = async (emailDetails: emailDetails): Promise<void> => {
  try {
    if (emailDetails) {
      const htmlContent = await ejs.renderFile(emailDetails.emailTemplate, {
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

      await transporter.sendMail(emailOptions);
    
    }
  } catch (error) {
    console.log(error);
  }
};
