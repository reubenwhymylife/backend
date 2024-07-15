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
exports.TxnStatus = void 0;
const mongoose_1 = require("mongoose");
const Signup_model_1 = __importDefault(require("../Signup/Signup.model"));
const payment_interface_1 = require("./payment.interface");
var TxnStatus;
(function (TxnStatus) {
    TxnStatus["PENDING"] = "PENDING";
    TxnStatus["FAILED"] = "FAILED";
    TxnStatus["SUCCESS"] = "SUCCESS";
})(TxnStatus || (exports.TxnStatus = TxnStatus = {}));
const paymentSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: Object.values(payment_interface_1.paymentType)
    },
    paymentRef: {
        type: Object,
    },
    amount: {
        type: Number,
    },
    email: {
        type: String,
    },
    transactionStatus: {
        type: String,
        enum: Object.values(TxnStatus),
        default: TxnStatus.FAILED
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
}, {
    timestamps: true,
});
paymentSchema.post("save", function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const register = yield Signup_model_1.default.findOneAndUpdate({ _id: doc.userId }, { $push: { payments: doc._id } }, { new: true });
            if (!register) {
                throw new Error("Associated Register document not found");
            }
        }
        catch (error) {
            console.error("Error pushing payment to payment array:", error);
        }
    });
});
paymentSchema.post("findOneAndDelete", function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (doc && doc.userId) {
                yield Signup_model_1.default.findByIdAndUpdate({ _id: doc.userId }, { $pull: { payments: doc._id } }, { new: true });
            }
        }
        catch (error) {
            console.error("Error removing payment from payment array:", error);
            throw error; // Re-throw the error to propagate it upwards
        }
    });
});
exports.default = (0, mongoose_1.model)("payments", paymentSchema);
