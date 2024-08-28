import express from "express";
import protect, { adminMiddleware } from "../middlewares/authMiddleware.js";
import { carAvailability, deleteBooking, deleteUser, getAllBookings, getAllUsers } from "../controllers/adminContoller.js";
import { createCar } from "../controllers/carController.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router()

router.get('/getAllUsers',protect, adminMiddleware, getAllUsers);
router.delete('/user/:userId', protect, adminMiddleware, deleteUser);
router.delete('/deleteBooking/:bookingId', protect, adminMiddleware, deleteBooking);
router.get('/getAllBooking',protect, adminMiddleware, getAllBookings);
router.patch('/updateCarAvailability',protect, adminMiddleware, carAvailability);
router.post('/createCar', upload.single('image') ,protect, adminMiddleware, createCar);
export default router; 