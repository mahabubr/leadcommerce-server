"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreRoutes = void 0;
const express_1 = __importDefault(require("express"));
const store_controller_1 = require("./store.controller");
const router = express_1.default.Router();
router.post('/create-store', store_controller_1.StoreController.createStore);
router.get('/', store_controller_1.StoreController.getAllStore);
exports.StoreRoutes = router;
