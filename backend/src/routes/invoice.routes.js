import { Router } from 'express';
import { createInvoice, invoicePdfStub, listInvoices, updateInvoice } from '../controllers/invoice.controller.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.use(protect);
router.route('/').get(listInvoices).post(createInvoice);
router.put('/:id', updateInvoice);
router.get('/:id/pdf', invoicePdfStub);

export default router;
