import { Router } from 'express';
import { createJob, listJobs, updateJob } from '../controllers/job.controller.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.use(protect);
router.route('/').get(listJobs).post(createJob);
router.put('/:id', updateJob);

export default router;
