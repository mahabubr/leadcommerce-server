import express from 'express';
import { ENUM_ROLE } from '../../../enum/role';
import auth from '../../middleware/auth';
import { DashboardController } from './dashboard.controller';

const router = express.Router();

router.get('/', auth(ENUM_ROLE.ADMIN), DashboardController.getDashboardInfo);

export const DashboardRoutes = router;
