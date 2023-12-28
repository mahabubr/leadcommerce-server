"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const role_1 = require("../../../enum/role");
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = require("../../middleware/validateRequest");
const employees_controller_1 = require("./employees.controller");
const employees_validation_1 = require("./employees.validation");
const router = express_1.default.Router();
router.post('/create-employe', (0, auth_1.default)(role_1.ENUM_ROLE.STORE), validateRequest_1.requestValidation.validateRequest(employees_validation_1.EmployeValidation.createEmployeSchema), employees_controller_1.EmployeController.createEmploye);
// update Employe
router.patch('/update', (0, auth_1.default)(role_1.ENUM_ROLE.EMPLOYEE), employees_controller_1.EmployeController.updateEmploye);
// get single data from single Employe
router.get('/single', (0, auth_1.default)(role_1.ENUM_ROLE.EMPLOYEE, role_1.ENUM_ROLE.STORE), employees_controller_1.EmployeController.getSingleEmploye);
// delete Employe
router.delete('/:id', (0, auth_1.default)(role_1.ENUM_ROLE.EMPLOYEE, role_1.ENUM_ROLE.STORE), employees_controller_1.EmployeController.deleteEmploye);
// search and filter and get multiple data
router.get('/', (0, auth_1.default)(role_1.ENUM_ROLE.EMPLOYEE, role_1.ENUM_ROLE.STORE, role_1.ENUM_ROLE.ADMIN), employees_controller_1.EmployeController.getAllEmploye);
exports.EmployeRoutes = router;
