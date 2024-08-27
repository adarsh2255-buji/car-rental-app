import express from 'express';
import { generateClientToken, paymentProcess } from '../controllers/paymentController.js';
const router = express.Router();

router.get('/clientToken',generateClientToken);
router.post('/payment/process', paymentProcess);

export default router; 