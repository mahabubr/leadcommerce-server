import express from 'express';
import { EventController } from './event.controller';

const router = express.Router();

router.post('/', EventController.createEvent);
router.get('/:id', EventController.getSingleEvent);
router.put('/:id', EventController.updateEvent);
router.delete('/:id', EventController.deleteEvent);

export const EventRoutes = router;
