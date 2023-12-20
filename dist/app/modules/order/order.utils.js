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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatedOrderCode = exports.findOrderCode = void 0;
const order_model_1 = require("./order.model");
const findOrderCode = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const lastRoute = yield order_model_1.Orders.findOne({}, { order_code: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean(); // operation make faster
    return (lastRoute === null || lastRoute === void 0 ? void 0 : lastRoute.order_code)
        ? (_a = lastRoute === null || lastRoute === void 0 ? void 0 : lastRoute.order_code) === null || _a === void 0 ? void 0 : _a.substring(3)
        : undefined;
});
exports.findOrderCode = findOrderCode;
const generatedOrderCode = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findOrderCode)()) || (0).toString().padStart(2, '0'); // 00000
    // increment by one
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(2, '0');
    incrementedId = `TC-${incrementedId}`; //TC-0001
    return incrementedId;
});
exports.generatedOrderCode = generatedOrderCode;
