"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const store_controller_1 = require("./store.controller");
const store_validation_1 = require("./store.validation");
const router = express_1.default.Router();
router.post('/create-store', validateRequest_1.requestValidation.validateRequest(store_validation_1.storeValidation.createStoreSchema), store_controller_1.StoreController.createStore);
// update store
router.patch('/:id', store_controller_1.StoreController.updateStore);
router.get('/single-store', store_controller_1.StoreController.getStoreSingleStore);
// search and filter and get multiple data
router.get('/', store_controller_1.StoreController.getAllStore);
router.get('/store-dashboard-data', store_controller_1.StoreController.getDashboardInfoForSeller);
// get single data from single Store
router.get('/:id', store_controller_1.StoreController.getSingleStore);
// delete store
router.delete('/:id', store_controller_1.StoreController.deleteStore);
exports.StoreRoutes = router;
