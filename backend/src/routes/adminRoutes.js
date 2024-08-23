import express from "express";
import protect, { adminMiddleware } from "../middlewares/authMiddleware.js";
import { carAvailability, getAllBookings, getAllUsers } from "../controllers/adminContoller.js";
import { createCar, uploadCarImage } from "../controllers/carController.js";

const router = express.Router()

router.get('/getAllUsers',protect, adminMiddleware, getAllUsers);
router.get('/getAllBooking',protect, adminMiddleware, getAllBookings);
router.put('/car/:carId/availability',protect, adminMiddleware, carAvailability);
router.post('/createCar',uploadCarImage, protect, adminMiddleware, createCar);
export default router;