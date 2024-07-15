"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const sessionSchema = new mongoose_1.Schema({
    _id: String,
    expires: Date,
    lastModified: Date,
    session: Object,
});
const SessionModel = (0, mongoose_1.model)("whymylifeSession", sessionSchema);
exports.default = SessionModel;
