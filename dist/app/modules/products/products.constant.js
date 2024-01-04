"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductFilterableFields = exports.ProductSearchableFields = exports.ProductStatus = void 0;
exports.ProductStatus = [
    'pending',
    'active',
    'restrict',
];
exports.ProductSearchableFields = ['productName', 'slug'];
exports.ProductFilterableFields = [
    'productName',
    'searchTerm',
    'price',
    'quantity',
];
