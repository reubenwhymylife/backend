"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const server = (0, express_1.default)();
const events_1 = __importDefault(require("events"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = require("./middleware/errorHandler");
const globalResponseHandler_1 = require("./middleware/globalResponseHandler");
const serverEmitter = new events_1.default();
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
require("express-async-errors");
const mystore = connect_mongo_1.default.create({
    mongoUrl: process.env.DB_URL,
    collectionName: "whymylifesessions",
    touchAfter: 24 * 3600,
    ttl: 7 * 24 * 60 * 60,
});
const Limit = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
class App {
    constructor(port, routes) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.middlewareinitializer();
        this.routeInitializer(routes);
        this.GlobalErrorHandler();
    }
    middlewareinitializer() {
        this.initializeSession();
        const whitelist = ["https://frontend-teal-two-94.vercel.app", "http://localhost:3000",];
        const corsOptions = {
            origin(origin, callback) {
                if (whitelist.indexOf(origin) !== -1) {
                    callback(null, true);
                }
                else {
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
        this.app.use((0, cors_1.default)({
            origin: ["https://frontend-teal-two-94.vercel.app", "http://localhost:3000", "www.frontend-teal-two-94.vercel.app", "https://whymylife.me", "www.whymylife.me", "https://www.whymylife.me"],
            credentials: true
        }));
        this.app.use(globalResponseHandler_1.responseHandler);
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.static("public"));
        this.app.set("view engine", "ejs");
    }
    initializeSession() {
        this.app.set("trust proxy", 1);
        this.app.use((0, express_session_1.default)({
            secret: process.env.SESSION_SECRET_KEY,
            resave: true,
            saveUninitialized: false,
            name: "whymylife_Captcha",
            store: mystore,
            cookie: {
                secure: false,
                httpOnly: false,
                maxAge: 1000 * 60 * 60 * 24,
                // partitioned: true,
                sameSite: "lax",
            },
        }));
    }
    routeInitializer(routes) {
        routes.map((router) => {
            this.app.use(router.path, router.router);
        });
        this.app.get("/", (req, res, next) => {
            res.send("WHYMYLIFE Server  now Available");
        });
        this.app.get("*", (req, res, next) => {
            res
                .status(404)
                .send(`<h1 style="height: 100vh; width: 100vw; display: flex; justify-content: center; align-items: center">Page Note Found 404</h1>`);
        });
    }
    GlobalErrorHandler() {
        this.app.use(errorHandler_1.errorHandler);
    }
    start() {
        this.app.listen(this.port, () => {
            console.log("App listening on port " + this.port);
        });
    }
}
exports.default = App;
