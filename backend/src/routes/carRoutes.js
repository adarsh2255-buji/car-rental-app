import express from 'express'
// import upload from '../config/cloudinary.js';
import { deleteCarById, getAllCars, getCarById } from '../controllers/carController.js';

const router = express.Router();


router.get('/getCar/:id',getCarById);
router.get('/cars',getAllCars);
router.delete('/deleteCar/:id',deleteCarById)



export default router;
