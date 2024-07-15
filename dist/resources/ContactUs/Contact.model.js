"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const contactSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    name: {
        type: String,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Email validation regex
            },
            message: (props) => `${props.value} is not a valid email address!`,
        },
    },
    message: {
        type: String,
    },
});
exports.default = (0, mongoose_1.model)("contact", contactSchema);
