"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const freeSubscriptionSchema = new mongoose_1.Schema({
    freeCount: {
        type: Number,
    },
    noOfMonths: {
        type: Number,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("freeSub", freeSubscriptionSchema);
