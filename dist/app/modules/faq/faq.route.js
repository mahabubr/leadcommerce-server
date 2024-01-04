"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const faq_controller_1 = require("./faq.controller");
const faq_validation_1 = require("./faq.validation");
const router = express_1.default.Router();
router.post('/create-faq', validateRequest_1.requestValidation.validateRequest(faq_validation_1.faqValidation.createFaqSchema), faq_controller_1.faqController.createFaq);
// update Faq
router.patch('/:id', faq_controller_1.faqController.updateFaq);
// get single data from single Faq
router.get('/:id', faq_controller_1.faqController.getSingleFaq);
// delete Faq
router.delete('/:id', faq_controller_1.faqController.deleteFaq);
// search and filter and get multiple data
router.get('/', faq_controller_1.faqController.getAllFaq);
exports.FaqRoutes = router;
