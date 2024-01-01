"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const role_1 = require("../../../enum/role");
const auth_1 = __importDefault(require("../../middleware/auth"));
const category_controller_1 = require("./category.controller");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(role_1.ENUM_ROLE.ADMIN), category_controller_1.CatregoryController.createCategory);
router.get('/', (0, auth_1.default)(role_1.ENUM_ROLE.ADMIN, role_1.ENUM_ROLE.STORE), category_controller_1.CatregoryController.getAllCategory);
router.get('/:id', (0, auth_1.default)(role_1.ENUM_ROLE.ADMIN), category_controller_1.CatregoryController.getSingleCategory);
router.patch('/:id', (0, auth_1.default)(role_1.ENUM_ROLE.ADMIN), category_controller_1.CatregoryController.updateCategory);
router.delete('/:id', (0, auth_1.default)(role_1.ENUM_ROLE.ADMIN), category_controller_1.CatregoryController.deleteCategory);
exports.CategoryRoutes = router;
