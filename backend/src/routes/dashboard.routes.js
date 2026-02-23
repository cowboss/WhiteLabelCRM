import { Router } from 'express';
import { getMetrics } from '../controllers/dashboard.controller.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/metrics', protect, getMetrics);

export default router;
