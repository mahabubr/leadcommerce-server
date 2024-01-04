"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const category_model_1 = require("./category.model");
const category_constant_1 = require("./category.constant");
// * create Category
const createCategory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.create(payload);
    return result;
});
// * get all Category
const getAllCategory = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: category_constant_1.CategorySearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andCondition.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
    const result = yield category_model_1.Category.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield category_model_1.Category.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// * get single Category
const getSingleCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.findOne({ _id: id });
    return result;
});
// * update single Category
const updateCategory = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield category_model_1.Category.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'This category is not exist');
    }
    const result = yield category_model_1.Category.findOneAndUpdate({ _id: id }, payload, {
        new: true, runValidators: true
    });
    return result;
});
// * delete single Category
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield category_model_1.Category.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'This category is not exist');
    }
    const result = yield category_model_1.Category.findByIdAndDelete(id);
    return result;
});
exports.CategoryServices = {
    createCategory,
    updateCategory,
    deleteCategory,
    getSingleCategory,
    getAllCategory,
};
