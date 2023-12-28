import express from 'express';
import { ENUM_ROLE } from '../../../enum/role';
import auth from '../../middleware/auth';
import { CatregoryController } from './category.controller';

const router = express.Router();

router.post('/', auth(ENUM_ROLE.ADMIN), CatregoryController.createCategory);
router.get(
  '/',
  auth(ENUM_ROLE.ADMIN, ENUM_ROLE.STORE),
  CatregoryController.getAllCategory
);
router.get(
  '/:id',
  auth(ENUM_ROLE.ADMIN),
  CatregoryController.getSingleCategory
);
router.patch('/:id', auth(ENUM_ROLE.ADMIN), CatregoryController.updateCategory);
router.delete(
  '/:id',
  auth(ENUM_ROLE.ADMIN),
  CatregoryController.deleteCategory
);

export const CategoryRoutes = router;
