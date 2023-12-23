import express from 'express';
import { ENUM_ROLE } from '../../../enum/role';
import auth from '../../middleware/auth';
import { requestValidation } from '../../middleware/validateRequest';
import { StoreController } from './store.controller';
import { storeValidation } from './store.validation';

const router = express.Router();

router.post(
  '/create-store',
  auth(ENUM_ROLE.ADMIN),
  requestValidation.validateRequest(storeValidation.createStoreSchema),
  StoreController.createStore
);
// update store
router.patch('/:id', auth(ENUM_ROLE.STORE), StoreController.updateStore);
// get single data from single Store
router.get(
  '/:id',
  auth(ENUM_ROLE.ADMIN, ENUM_ROLE.EMPLOYEE, ENUM_ROLE.STORE),
  StoreController.getSingleStore
);
// delete store
router.delete('/:id', auth(ENUM_ROLE.ADMIN), StoreController.deleteStore);
// search and filter and get multiple data
router.get('/', auth(ENUM_ROLE.ADMIN), StoreController.getAllStore);

export const StoreRoutes = router;
