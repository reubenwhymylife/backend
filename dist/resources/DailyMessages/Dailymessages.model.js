"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    section1: {
        type: String,
    },
    section2: {
        type: String,
    },
    date: {
        type: Date,
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("dailyMessages", messageSchema);
