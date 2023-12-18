import express from 'express';
import { StoreController } from './store.controller';

const router = express.Router();

router.post('/create-store', StoreController.createStore);
router.get('/', StoreController.getAllStore);

export const StoreRoutes = router;
