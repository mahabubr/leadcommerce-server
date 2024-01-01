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
exports.StoreServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const employees_model_1 = __importDefault(require("../employees/employees.model"));
const admin_model_1 = __importDefault(require("../admin/admin.model"));
const store_constants_1 = require("./store.constants");
const store_model_1 = __importDefault(require("./store.model"));
const store_utils_1 = require("./store.utils");
const createStore = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield admin_model_1.default.findOne({ email: payload.email });
    const employee = yield employees_model_1.default.findOne({ email: payload.email });
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
    const { password, email, name, contact_no, earning, location, logo, owner_name, refund, total_orders, } = payload;
    const hash = yield bcrypt_1.default.hash(password, 12);
    const payloadData = {
        password: hash,
        email,
        name,
        contact_no,
        earning,
        location,
        logo,
        owner_name,
        refund,
        total_orders,
    };
    const result = yield store_model_1.default.create(payloadData);
    return result;
});
// get multiple data from store py pagination and searching
const getAllStore = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: store_constants_1.StoreSearchableFields.map(field => ({
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
    const result = yield store_model_1.default.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield store_model_1.default.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// * get single Stores
const getSingleStore = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield store_model_1.default.findById(id);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Store not found');
    }
    return result;
});
const getStoreSingleStore = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield store_model_1.default.findById(id);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Store not found');
    }
    return result;
});
// * update single Product
const updateStore = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield store_model_1.default.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Store is not found');
    }
    if (payload.email) {
        const isExist = yield store_model_1.default.find({ email: payload.email });
        if (isExist)
            throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Email is already in used');
    }
    const result = yield store_model_1.default.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
// * delete single product
const deleteStore = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield store_model_1.default.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Store not found');
    }
    const result = yield store_model_1.default.findByIdAndDelete(id);
    return result;
});
// *
const getDashboardInfoForSeller = () => __awaiter(void 0, void 0, void 0, function* () {
    const getPendingOrdersData = yield store_utils_1.SellerDashboardUtils.getPendingOrdersData();
    const getDeliveredOrdersData = yield store_utils_1.SellerDashboardUtils.getDeliveredOrdersData();
    const getRefundsOrdersData = yield store_utils_1.SellerDashboardUtils.getRefundsOrdersData();
    const totalRefunds = yield store_utils_1.SellerDashboardUtils.totalRefunds();
    const totalEarning = yield store_utils_1.SellerDashboardUtils.totalEarning();
    const totalOrders = yield store_utils_1.SellerDashboardUtils.totalOrders();
    const info = {
        getPendingOrdersData,
        getDeliveredOrdersData,
        getRefundsOrdersData,
        data: {
            refund: totalRefunds,
            earning: totalEarning,
            total_orders: totalOrders,
        },
    };
    return info;
});
exports.StoreServices = {
    createStore,
    getAllStore,
    getSingleStore,
    updateStore,
    deleteStore,
    getStoreSingleStore,
    getDashboardInfoForSeller,
};
