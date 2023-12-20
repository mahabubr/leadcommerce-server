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
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../helpers/jwtHelpers");
const store_model_1 = __importDefault(require("../store/store.model"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isExist = yield store_model_1.default.findOne({
        email: email,
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Store not found');
    }
    const isPassMatched = yield bcrypt_1.default.compare(password, isExist.password);
    if (!isPassMatched) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password not matched');
    }
    const accessToken = jwtHelpers_1.JwtHelper.createToken({ id: isExist._id, email: isExist.email }, 'Secret', '30d');
    return {
        accessToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifyToken = jwtHelpers_1.JwtHelper.verifyToken(token.token, 'Secret');
    try {
        verifyToken = jwtHelpers_1.JwtHelper.verifyToken(token.token, 'Secret');
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
    const accessToken = jwtHelpers_1.JwtHelper.createToken({ id: isExist._id, email: isExist.email }, 'Secret', '5m');
    return {
        accessToken,
    };
});
exports.AuthService = {
    loginUser,
    refreshToken,
};
