"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'category name filed is required'],
    },
    desc: {
        type: String,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Category = (0, mongoose_1.model)('Category', CategorySchema);
