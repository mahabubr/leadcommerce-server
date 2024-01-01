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
exports.ShipmentServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const shipment_interface_1 = require("./shipment.interface");
const shipment_model_1 = __importDefault(require("./shipment.model"));
const createShipment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const ShipmentExist = yield shipment_model_1.default.findOne({ order_id: payload.order_id });
    // checking order_id is already used or not
    if (ShipmentExist) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'order_id is already used');
    }
    const result = yield shipment_model_1.default.create(payload);
    return result;
});
// get multiple data from Shipment py pagination and searching
const getAllShipment = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: shipment_interface_1.ShipmentSearchableFields.map(field => ({
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
    const result = yield shipment_model_1.default.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield shipment_model_1.default.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// * get single Shipments
const getSingleShipment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield shipment_model_1.default.findById(id);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Shipment not found');
    }
    return result;
});
// * update single Product
const updateShipment = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield shipment_model_1.default.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Shipment is not found');
    }
    if (payload.order_id) {
        const isExist = yield shipment_model_1.default.find({ order_id: payload.order_id });
        if (isExist)
            throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Order_id is already in used');
    }
    const result = yield shipment_model_1.default.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
// * delete single product
const deleteShipment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield shipment_model_1.default.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Shipment not found');
    }
    const result = yield shipment_model_1.default.findByIdAndDelete(id);
    return result;
});
exports.ShipmentServices = {
    createShipment,
    getAllShipment,
    getSingleShipment,
    updateShipment,
    deleteShipment,
};
