import express from 'express';
import { requestValidation } from '../../middleware/validateRequest';
import { faqController } from './faq.controller';
import { faqValidation } from './faq.validation';

const router = express.Router();

router.post(
  '/create-faq',

  requestValidation.validateRequest(faqValidation.createFaqSchema),
  faqController.createFaq
);
// update Faq
router.patch('/:id', faqController.updateFaq);
// get single data from single Faq
router.get('/:id', faqController.getSingleFaq);
// delete Faq
router.delete('/:id', faqController.deleteFaq);
// search and filter and get multiple data
router.get('/', faqController.getAllFaq);

export const FaqRoutes = router;
