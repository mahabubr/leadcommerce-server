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
exports.EventService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const event_constant_1 = require("./event.constant");
const event_model_1 = require("./event.model");
// *--[create event]--
const createEvent = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield event_model_1.Event.create(payload);
    return result;
});
const getAllEvents = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: event_constant_1.EventSearchableField.map(field => ({
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
    const result = yield event_model_1.Event.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield event_model_1.Event.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// * get single product
const getSingleEvent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield event_model_1.Event.findById(id);
    return result;
});
// *--[update single event]--
const updateEvent = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield event_model_1.Event.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'event is not exist');
    }
    const result = yield event_model_1.Event.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
// *--[delete single event]--
const deleteEvent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield event_model_1.Event.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'event is not exist');
    }
    const result = yield event_model_1.Event.findByIdAndDelete(id, {
        new: true,
    });
    return result;
});
exports.EventService = {
    createEvent,
    getSingleEvent,
    updateEvent,
    deleteEvent,
    getAllEvents,
};
