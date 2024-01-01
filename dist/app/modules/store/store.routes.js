"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreRoutes = void 0;
const express_1 = __importDefault(require("express"));
const role_1 = require("../../../enum/role");
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = require("../../middleware/validateRequest");
const store_controller_1 = require("./store.controller");
const store_validation_1 = require("./store.validation");
const router = express_1.default.Router();
router.post('/create-store', (0, auth_1.default)(role_1.ENUM_ROLE.ADMIN), validateRequest_1.requestValidation.validateRequest(store_validation_1.storeValidation.createStoreSchema), store_controller_1.StoreController.createStore);
// update store
router.patch('/:id', (0, auth_1.default)(role_1.ENUM_ROLE.STORE), store_controller_1.StoreController.updateStore);
router.get('/single-store', (0, auth_1.default)(role_1.ENUM_ROLE.STORE), store_controller_1.StoreController.getStoreSingleStore);
// search and filter and get multiple data
router.get('/', (0, auth_1.default)(role_1.ENUM_ROLE.ADMIN), store_controller_1.StoreController.getAllStore);
router.get('/store-dashboard-data', 
// auth(ENUM_ROLE.EMPLOYEE, ENUM_ROLE.STORE),
store_controller_1.StoreController.getDashboardInfoForSeller);
// get single data from single Store
router.get('/:id', (0, auth_1.default)(role_1.ENUM_ROLE.ADMIN, role_1.ENUM_ROLE.EMPLOYEE, role_1.ENUM_ROLE.STORE), store_controller_1.StoreController.getSingleStore);
// delete store
router.delete('/:id', (0, auth_1.default)(role_1.ENUM_ROLE.ADMIN), store_controller_1.StoreController.deleteStore);
exports.StoreRoutes = router;
