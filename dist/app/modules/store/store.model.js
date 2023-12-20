"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const StoreSchema = new mongoose_1.Schema({
    logo: { type: String },
    name: { type: String, required: true },
    owner_name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    contact_no: { type: String },
    location: { type: String },
    total_orders: { type: String },
    earning: { type: Number },
    refund: { type: Number },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
const Store = (0, mongoose_1.model)('Store', StoreSchema);
exports.default = Store;
