"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DeliverySchema = new mongoose_1.Schema({
    image: {
        avatar: { type: String },
        avatar_public_url: { type: String },
    },
    full_name: { type: String, required: true },
    position: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, default: null },
    country: { type: String, default: 'United States' },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
const Delivery = (0, mongoose_1.model)('Delivery', DeliverySchema);
exports.default = Delivery;
