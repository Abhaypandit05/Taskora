import { Router } from 'express';
import { register, login, getMe, logout } from '../controllers/authController.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authenticateJWT, getMe);

export default router;
