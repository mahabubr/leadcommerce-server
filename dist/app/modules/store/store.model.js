"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const StoreSchema = new mongoose_1.Schema({
    logo: {
        type: String,
        default: null,
    },
    name: { type: String, required: true },
    owner_name: { type: String, default: null },
    email: { type: String, required: true },
    password: { type: String, required: true },
    contact_no: { type: String, default: null },
    location: { type: String, default: null },
    total_orders: { type: String, default: null },
    earning: { type: [], default: null },
    refund: { type: Number, default: null },
    balance: { type: Number, default: null },
    company_type: { type: String, default: null },
    website: { type: String, default: null },
    country: { type: String, default: 'United States' },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
const Store = (0, mongoose_1.model)('Store', StoreSchema);
exports.default = Store;
