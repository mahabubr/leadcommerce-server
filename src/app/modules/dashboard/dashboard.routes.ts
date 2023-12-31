import express from 'express';
import { DashboardController } from './dashboard.controller';

const router = express.Router();

router.get('/', DashboardController.getDashboardInfo);

export const DashboardRoutes = router;
