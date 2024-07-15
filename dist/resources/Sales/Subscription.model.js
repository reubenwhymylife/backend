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
const Signup_model_1 = __importDefault(require("../Signup/Signup.model"));
const subscriptionSchema = new mongoose_1.Schema({
    forMe: {
        userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "user" },
        noOfMonths: { type: Number, required: true },
        renewable: { type: Boolean, required: true },
    },
    forOthers: {
        noOfMonths: { type: Number },
        renewable: { type: Boolean },
    },
    totalCost: { type: String },
}, { timestamps: true });
subscriptionSchema.post("save", function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const register = yield Signup_model_1.default.findOneAndUpdate({ _id: doc.forMe.userId }, { $push: { subscriptions: doc._id } }, { new: true });
            if (!register) {
                throw new Error("Associated Register document not found");
            }
        }
        catch (error) {
            console.error("Error pushing subscription to subscription array:", error);
        }
    });
});
subscriptionSchema.post("findOneAndDelete", function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (doc && doc.forMe.userId) {
                // Accessing userId via forMe
                yield Signup_model_1.default.findByIdAndUpdate(doc.forMe.userId, { $pull: { subscriptions: doc._id } }, { new: true });
            }
        }
        catch (error) {
            console.error("Error removing subscription from subscription array:", error);
            throw error;
        }
    });
});
exports.default = (0, mongoose_1.model)("subscriptions", subscriptionSchema);
