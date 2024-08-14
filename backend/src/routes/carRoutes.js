import express from 'express'
import upload from '../config/cloudinary.js';
import { createCar, getAllCars, getCarById } from '../controllers/carController.js';

const router = express.Router();

router.post('/createCar',createCar);
router.get('/getCar/:id',getCarById);
router.get('/cars',getAllCars);



export default router;
