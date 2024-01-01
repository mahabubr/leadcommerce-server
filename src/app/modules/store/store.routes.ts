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
router.get('/single-store', StoreController.getStoreSingleStore);

// search and filter and get multiple data
router.get('/', StoreController.getAllStore);
router.get('/store-dashboard-data', StoreController.getDashboardInfoForSeller);

// get single data from single Store
router.get('/:id', StoreController.getSingleStore);

// delete store
router.delete('/:id', StoreController.deleteStore);

export const StoreRoutes = router;
