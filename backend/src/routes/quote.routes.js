import { Router } from 'express';
import {
  acceptQuote,
  createQuote,
  liveQuote,
  listQuotes,
  quotePdfStub,
  updateQuote,
} from '../controllers/quote.controller.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/live/:token', liveQuote);
router.use(protect);
router.route('/').get(listQuotes).post(createQuote);
router.put('/:id', updateQuote);
router.post('/:id/accept', acceptQuote);
router.get('/:id/pdf', quotePdfStub);

export default router;
