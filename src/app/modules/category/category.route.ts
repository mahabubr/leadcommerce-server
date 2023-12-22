import express from 'express';
import { CatregoryController } from './category.controller';

const router = express.Router();

router.post('/', CatregoryController.createCategory);
router.get('/', CatregoryController.getAllCategory);
router.get('/:id', CatregoryController.getSingleCategory);
router.patch('/:id', CatregoryController.updateCategory);
router.delete('/:id', CatregoryController.deleteCategory);

export const CategoryRoutes = router;