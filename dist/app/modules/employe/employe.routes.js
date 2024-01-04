"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("../../middleware/multer"));
const validateRequest_1 = require("../../middleware/validateRequest");
const employe_controller_1 = require("./employe.controller");
const employe_validation_1 = require("./employe.validation");
const router = express_1.default.Router();
router.post('/create-employe', multer_1.default.single('image'), validateRequest_1.requestValidation.validateRequest(employe_validation_1.EmployeValidation.createEmployeSchema), employe_controller_1.EmployeController.createEmploye);
// update Employe
router.patch('/update', employe_controller_1.EmployeController.updateEmploye);
// get single data from single Employe
router.get('/single', employe_controller_1.EmployeController.getSingleEmploye);
// delete Employe
router.delete('/:id', employe_controller_1.EmployeController.deleteEmploye);
// search and filter and get multiple data
router.get('/', employe_controller_1.EmployeController.getAllEmploye);
exports.EmployeRoutes = router;
