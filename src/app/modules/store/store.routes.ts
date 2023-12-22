import express from 'express';
import { requestValidation } from '../../middleware/validateRequest';
import { StoreController } from './store.controller';
import { storeValidation } from './store.validation';

const router = express.Router();

router.post(
  '/create-store',
  requestValidation.validateRequest(storeValidation.createStoreSchema),
  StoreController.createStore
);
// update store
router.patch('/:id', StoreController.updateStore);
// get single data from single Store
router.get('/:id', StoreController.getSingleStore);
// delete store
router.delete('/:id', StoreController.deleteStore);
// search and filter and get multiple data
router.get('/', StoreController.getAllStore);

export const StoreRoutes = router;
