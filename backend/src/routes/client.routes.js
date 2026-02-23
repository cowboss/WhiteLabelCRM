import { Router } from 'express';
import { createClient, deleteClient, getClient, listClients, updateClient } from '../controllers/client.controller.js';
import { authorize, protect } from '../middleware/auth.js';

const router = Router();

router.use(protect);
router.route('/').get(listClients).post(createClient);
router.route('/:id').get(getClient).put(updateClient).delete(authorize('admin', 'manager'), deleteClient);

export default router;
