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
const FreeSubscriptions_1 = __importDefault(require("./FreeSubscriptions"));
const node_schedule_1 = __importDefault(require("node-schedule"));
const subscriptionSchema = new mongoose_1.Schema({
    forMe: {
        userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "user" },
        noOfMonths: { type: Number, required: true },
        renewable: { type: Boolean, default: false },
    },
    forOthers: {
        noOfMonths: { type: Number },
        renewable: { type: Boolean, default: false },
    },
    totalCost: { type: String },
    reason: String,
    cancelMe: Boolean,
    cancelOthers: Boolean,
    isActive: { type: Boolean, default: true },
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
        if (doc.forOthers && doc.forOthers.noOfMonths) {
            try {
                const freeSubs = FreeSubscriptions_1.default.create({
                    userId: doc.forMe.userId,
                    freeCount: 1,
                    noOfMonths: doc.forOthers.noOfMonths,
                });
            }
            catch (error) {
                console.error("Error creating/updating FreeSubscriptions:", error);
            }
        }
        // Schedule job to set isActive to false after 30 days
        const dateToRun = new Date(doc.createdAt.getTime() + 30 * 24 * 60 * 60 * 1000);
        node_schedule_1.default.scheduleJob(dateToRun, () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, mongoose_1.model)("subscriptions").findByIdAndUpdate(doc._id, {
                    isActive: false,
                });
            }
            catch (error) {
                console.error("Error updating isActive status:", error);
            }
        }));
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
        // if (doc.forOthers && doc.forOthers.noOfMonths) {
        //   try {
        //     // Check if FreeSubscriptions exists for the user
        //     const existingFreeSubscription = await FreeSubscriptions.findOne({
        //       userId: doc.forMe.userId,
        //     });
        //     if (existingFreeSubscription) {
        //       // Update existing FreeSubscriptions
        //       await FreeSubscriptions.findOneAndUpdate(
        //         { userId: doc.forMe.userId },
        //         { $set: { noOfMonths: doc.forOthers.noOfMonths } },
        //         { new: true }
        //       );
        //     } else {
        //       // Create new FreeSubscriptions
        //       await FreeSubscriptions.create({
        //         userId: doc.forMe.userId,
        //         freeCount: 1,
        //         noOfMonths: doc.forOthers.noOfMonths,
        //       });
        //     }
        //   } catch (error) {
        //     console.error("Error creating/updating FreeSubscriptions:", error);
        //   }
        // }
    });
});
subscriptionSchema.post("findOneAndUpdate", function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        if (doc && doc.cancelOthers === true) {
            try {
                // Check if FreeSubscriptions exists for the user
                const existingFreeSubscription = yield FreeSubscriptions_1.default.findOne({
                    userId: doc.forMe.userId,
                });
                if (existingFreeSubscription) {
                    // Update existing FreeSubscriptions
                    yield FreeSubscriptions_1.default.findOneAndDelete({ userId: doc.forMe.userId });
                }
            }
            catch (error) {
                console.error("Error removing FreeSubscriptions:", error);
            }
        }
    });
});
exports.default = (0, mongoose_1.model)("subscriptions", subscriptionSchema);
