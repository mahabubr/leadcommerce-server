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
exports.AdminServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const store_model_1 = __importDefault(require("../store/store.model"));
const admin_constant_1 = require("./admin.constant");
const admin_model_1 = __importDefault(require("./admin.model"));
const employe_model_1 = __importDefault(require("../employe/employe.model"));
const createAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield admin_model_1.default.findOne({ email: payload.email });
    const employee = yield employe_model_1.default.findOne({ email: payload.email });
    const store = yield store_model_1.default.findOne({ email: payload.email });
    // checking Email is already used or not
    if (admin) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Admin is already used');
    }
    if (employee) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Employee is already used');
    }
    if (store) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Store is already used');
    }
    const { address, email, full_name, image, password, phone } = payload;
    const hash = yield bcrypt_1.default.hash(password, 12);
    const createPayload = {
        address,
        email,
        full_name,
        image,
        password: hash,
        phone,
    };
    const result = yield admin_model_1.default.create(createPayload);
    return result;
});
// get multiple data from Admin py pagination and searching
const getAllAdmin = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: admin_constant_1.AdminSearchableFields.map(field => ({
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
    const result = yield admin_model_1.default.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield admin_model_1.default.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// * get single Admins
const getSingleAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.default.findById(id);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Admin not found');
    }
    return result;
});
// * update single Product
const updateAdmin = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield admin_model_1.default.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Admin is not found');
    }
    if (payload.email) {
        const isExist = yield admin_model_1.default.find({ email: payload.email });
        if (isExist)
            throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Email is already in used');
    }
    const result = yield admin_model_1.default.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
// * delete single product
const deleteAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield admin_model_1.default.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Admin not found');
    }
    const result = yield admin_model_1.default.findByIdAndDelete(id);
    return result;
});
exports.AdminServices = {
    createAdmin,
    getAllAdmin,
    getSingleAdmin,
    updateAdmin,
    deleteAdmin,
};
