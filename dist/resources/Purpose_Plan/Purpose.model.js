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
const purposeSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    theReach: {
        type: String,
    },
    purposeName: {
        type: String,
        required: true,
    },
    projectName: {
        type: String,
        required: true,
    },
    whatIsIt: {
        type: String,
    },
    why: {
        type: String,
    },
    whyYou: {
        type: String,
    },
    theVision: {
        type: String,
    },
    theMission: {
        type: String,
    },
    whatDoesItDo: {
        type: String,
    },
    whomDoesItServe: {
        type: String,
    },
    whyShouldItExist: {
        type: String,
    },
    defineYourPurpose: {
        type: String,
    },
    steps: {
        type: String,
    },
    values: {
        type: String,
    },
    personalities: {
        type: String,
    },
}, { timestamps: true });
purposeSchema.post("save", function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const register = yield Signup_model_1.default.findOneAndUpdate({ _id: doc.userId }, { $push: { purposes: doc._id } }, { new: true });
            if (!register) {
                throw new Error("Associated Register document not found");
            }
        }
        catch (error) {
            console.error("Error pushing subscription to subscription array:", error);
        }
    });
});
purposeSchema.post("findOneAndDelete", function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (doc && doc.forMe.userId) {
                // Accessing userId via forMe
                yield Signup_model_1.default.findByIdAndUpdate(doc.forMe.userId, { $pull: { purposes: doc._id } }, { new: true });
            }
        }
        catch (error) {
            console.error("Error removing subscription from subscription array:", error);
            throw error;
        }
    });
});
const PurposeModel = (0, mongoose_1.model)("purposes", purposeSchema);
exports.default = PurposeModel;
