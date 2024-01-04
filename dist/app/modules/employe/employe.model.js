"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const EmployeSchema = new mongoose_1.Schema({
    image: {
        avatar: { type: String },
        avatar_public_url: { type: String },
    },
    full_name: { type: String, required: true },
    position: { type: String, required: true },
    shop_id: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Store',
        // required: true,
    },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    country: { type: String, default: 'United States' },
    income: { type: Number, default: 0 },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
const Employe = (0, mongoose_1.model)('Employe', EmployeSchema);
exports.default = Employe;
