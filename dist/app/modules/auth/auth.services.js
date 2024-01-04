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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../helpers/jwtHelpers");
const admin_model_1 = __importDefault(require("../admin/admin.model"));
const delivery_model_1 = __importDefault(require("../delivery/delivery.model"));
const store_model_1 = __importDefault(require("../store/store.model"));
const employe_model_1 = __importDefault(require("../employe/employe.model"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const admin = yield admin_model_1.default.findOne({ email: email });
    const employee = yield employe_model_1.default.findOne({ email: email });
    const store = yield store_model_1.default.findOne({ email: email });
    const delivery = yield delivery_model_1.default.findOne({ email: email });
    if (!admin && !store && !employee && !delivery) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'User Not Found');
    }
    if (admin) {
        const isPassMatched = yield bcrypt_1.default.compare(password, admin.password);
        if (!isPassMatched) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password not matched');
        }
        const accessToken = jwtHelpers_1.JwtHelper.createToken({ id: admin._id, email: admin.email, role: 'admin' }, config_1.default.jwt.secret, '30d');
        return {
            accessToken,
        };
    }
    if (employee) {
        const isPassMatched = yield bcrypt_1.default.compare(password, employee.password);
        if (!isPassMatched) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password not matched');
        }
        const accessToken = jwtHelpers_1.JwtHelper.createToken({ id: employee._id, email: employee.email, role: 'employee' }, config_1.default.jwt.secret, '30d');
        return {
            accessToken,
        };
    }
    if (store) {
        const isPassMatched = yield bcrypt_1.default.compare(password, store.password);
        if (!isPassMatched) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password not matched');
        }
        const accessToken = jwtHelpers_1.JwtHelper.createToken({ id: store._id, email: store.email, role: 'store' }, config_1.default.jwt.secret, '30d');
        return {
            accessToken,
        };
    }
    if (delivery) {
        const isPassMatched = yield bcrypt_1.default.compare(password, delivery.password);
        if (!isPassMatched) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password not matched');
        }
        const accessToken = jwtHelpers_1.JwtHelper.createToken({ id: delivery._id, email: delivery.email, role: 'delivery' }, config_1.default.jwt.secret, '30d');
        return {
            accessToken,
        };
    }
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifyToken;
    try {
        verifyToken = jwtHelpers_1.JwtHelper.verifyToken(token.token, config_1.default.jwt.secret);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Token not verified');
    }
    const { email } = verifyToken;
    const isExist = yield store_model_1.default.findOne({
        email: email,
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Store not found');
    }
    const accessToken = jwtHelpers_1.JwtHelper.createToken({ id: isExist._id, email: isExist.email }, config_1.default.jwt.secret, '5m');
    return {
        accessToken,
    };
});
exports.AuthService = {
    loginUser,
    refreshToken,
};
