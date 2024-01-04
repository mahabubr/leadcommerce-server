"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const faqSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    ans: { type: String },
    user_id: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
const Faq = (0, mongoose_1.model)('Faq', faqSchema);
exports.default = Faq;
