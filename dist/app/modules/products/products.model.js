"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
const mongoose_1 = require("mongoose");
const products_constant_1 = require("./products.constant");
const ProductsSchema = new mongoose_1.Schema({
    image: {
        avatar: { type: String },
        avatar_public_url: { type: String },
    },
    productName: {
        type: String,
        required: true,
    },
    categories: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    fullDescription: {
        type: String,
        required: true,
    },
    color: {
        type: [String],
    },
    size: {
        type: [String],
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    fullDetail: {
        type: String,
    },
    productTags: {
        type: [String],
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: products_constant_1.ProductStatus,
        default: 'active',
    },
    store_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        // ref: 'Payments',  // TODO: change to the Payments table schema
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Products = (0, mongoose_1.model)('Products', ProductsSchema);
