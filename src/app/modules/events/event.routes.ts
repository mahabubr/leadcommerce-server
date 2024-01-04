import express from 'express';
import { EventController } from './event.controller';
import multer from '../../middleware/multer';

const router = express.Router();

router.post('/', multer.single('image'), EventController.createEvent);
router.get('/', EventController.getAllEvents);
router.get('/:id', EventController.getSingleEvent);
router.put('/:id', EventController.updateEvent);
router.delete('/:id', EventController.deleteEvent);

export const EventRoutes = router;
