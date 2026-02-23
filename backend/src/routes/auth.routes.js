import { Router } from 'express';
import { login, loginValidation, me, register, registerValidation } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.get('/me', protect, me);
router.post('/logout', (_req, res) => res.json({ message: 'Logout handled client-side by removing JWT' }));

export default router;
