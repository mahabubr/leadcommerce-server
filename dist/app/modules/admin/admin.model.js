"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AdminSchema = new mongoose_1.Schema({
    image: { type: String, required: true },
    full_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    country: { type: String, default: 'United States' },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
const Admin = (0, mongoose_1.model)('Admin', AdminSchema);
exports.default = Admin;
