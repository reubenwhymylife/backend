import dotenv from "dotenv";
dotenv.config();
import express, { Response, Request, NextFunction, Application } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import rateLimit from "express-rate-limit";
const server = express();
import EventEmitter from "events";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";
import { responseHandler } from "./middleware/globalResponseHandler";
const serverEmitter = new EventEmitter();
import session, { SessionOptions } from "express-session";
import mongoStore from "connect-mongo";
import "express-async-errors";
import IRoute from "./routes/generalRoutes";
import cookieParser from 'cookie-parser';
import cron from "node-cron"
import paymentModel from "./resources/Payments/payment.model";
import { queryTransactionStatus } from "./resources/Payments/payment.controller";
const mystore = mongoStore.create({
  mongoUrl: process.env.DB_URL,
  collectionName: "whymylifesessions",
  touchAfter: 24 * 3600,
  ttl: 7 * 24 * 60 * 60,
});

const Limit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

export default class App {
  private app: Application;
  private readonly port: number;

  constructor(port: number, routes: IRoute[]) {
    this.app = express();
    this.port = port;
    this.middlewareinitializer();
    this.routeInitializer(routes);
    this.GlobalErrorHandler();
  }

  private middlewareinitializer() {
    this.initializeSession();
  const whitelist = ["https://frontend-teal-two-94.vercel.app", "http://localhost:3000",]
  const corsOptions = {
  origin(origin:any, callback:any) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  allowedHeaders: [
    'Access-Control-Allow-Origin',
    'Content-Type',
    'Authorization'
  ],
  Headers: true,
  exposedHeaders: 'Set-Cookie'
};
this.app.use(
  cors({
    origin: ["https://frontend-teal-two-94.vercel.app", "http://localhost:3000", "www.frontend-teal-two-94.vercel.app",  "https://whymylife.me", "www.whymylife.me", "https://www.whymylife.me"],
    credentials: true
  })
);
  
    this.app.use(responseHandler as any);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static("public"));
    this.app.set("view engine", "ejs");
  }
  private initializeSession() {
    this.app.set("trust proxy", 1);
    this.app.use(
      session({
        secret: process.env.SESSION_SECRET_KEY as string,
        resave: true,
        saveUninitialized: false,
        name: "whymylife_Captcha",
        store: mystore,
       cookie: {
        secure: true, 
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        partitioned: true,
        sameSite: "none",
},
      })
    );
  }
  private routeInitializer(routes: IRoute[]) {
    routes.map((router: IRoute) => {
      this.app.use(router.path, router.router);
    });
    this.app.get("/", (req, res, next) => {
      res.send("WHYMYLIFE Server  now Available");
    });
    this.app.get("*", (req, res, next) => {
      res
        .status(404)
        .send(
          `<h1 style="height: 100vh; width: 100vw; display: flex; justify-content: center; align-items: center">Page Note Found 404</h1>`
        );
    });
  }
  private GlobalErrorHandler() {
    this.app.use(errorHandler);
  }
  public start() {
    this.app.listen(this.port, () => {
      console.log("App listening on port " + this.port);
    });

    cron.schedule("*/1 * * * *", async ()=>{
      const fetchedTransactions = await paymentModel.find({transactionStatus:"PENDING"}).exec()
        console.log(fetchedTransactions)
        if(fetchedTransactions){
          for(const trasaction of fetchedTransactions){
            if(trasaction && trasaction.transactionRef){
              // console.log(trasaction, "this is the trasaction")
              const transaction = await queryTransactionStatus(trasaction.transactionRef)
              if(transaction && transaction.status === "success"){
                await paymentModel.findOneAndUpdate({transactionRef:transaction.transactionRef}, {$set:{transactionStatus:transaction.status}})
              }else{
                await paymentModel.findOneAndUpdate({transactionRef:transaction.transactionRef}, {$set:{transactionStatus:transaction.status}})
              }
            }
          }
        }
    })
  }
}
