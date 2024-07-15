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
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Subscription_model_1 = __importDefault(require("../Subscriptions/Subscription.model"));
const ResgisterSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Email validation regex
            },
            message: (props) => `${props.value} is not a valid email address!`,
        },
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    terms: {
        type: Boolean,
        default: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isDisabled: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
        required: true,
    },
    payments: [
        {
            type: mongoose_1.Schema.Types.String,
            ref: "payments",
        },
    ],
    subscriptions: [
        {
            type: mongoose_1.Schema.Types.String,
            ref: "subscriptions",
        },
    ],
    purposes: [
        {
            type: mongoose_1.Schema.Types.String,
            ref: "purposes",
        },
    ],
}, {
    timestamps: true,
});
ResgisterSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const salt = yield bcrypt_1.default.genSalt(10);
            const hash = yield bcrypt_1.default.hash(this.password, salt);
            this.password = hash;
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
// / compare password
ResgisterSchema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(password, this.password);
    });
};
ResgisterSchema.post("findOneAndDelete", function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield Subscription_model_1.default.deleteMany({ 'forMe.userId': doc._id });
        }
        catch (error) {
            console.log(error);
        }
    });
});
exports.default = (0, mongoose_1.model)("user", ResgisterSchema);
