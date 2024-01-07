"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("../../middleware/multer"));
const validateRequest_1 = require("../../middleware/validateRequest");
const admin_controller_1 = require("./admin.controller");
const admin_validation_1 = require("./admin.validation");
const router = express_1.default.Router();
router.post('/create-admin', multer_1.default.single('image'), validateRequest_1.requestValidation.validateRequest(admin_validation_1.AdminValidation.createAdminSchema), admin_controller_1.AdminController.createAdmin);
// get single data from single Employe
router.get('/single', admin_controller_1.AdminController.getSingleAdminWithtoken);
// update Admin
router.put('/update', multer_1.default.single('image'), admin_controller_1.AdminController.updateAdmin);
// get single data from single Admin
router.get('/:id', admin_controller_1.AdminController.getSingleAdmin);
// delete Admin
router.delete('/:id', admin_controller_1.AdminController.deleteAdmin);
// search and filter and get multiple data
router.get('/', admin_controller_1.AdminController.getAllAdmin);
exports.AdminRoutes = router;
