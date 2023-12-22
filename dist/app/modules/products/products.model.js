"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
const mongoose_1 = require("mongoose");
const products_constant_1 = require("./products.constant");
const ProductsSchema = new mongoose_1.Schema({
    image: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    categories: {
        type: [String],
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
        required: true,
    },
    color: {
        type: [String],
        required: true,
    },
    size: {
        type: [String],
        required: true,
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
        required: true,
    },
    productTags: {
        type: [String],
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: products_constant_1.ProductStatus,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Products = (0, mongoose_1.model)('Products', ProductsSchema);
