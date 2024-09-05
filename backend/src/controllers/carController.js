import Car from "../model/carModel.js";
import { imageUploadCloudinary } from "../utils/cloundinaryUpload.js";



//CREATE CAR
export const createCar = async (req, res) =>{
    try {
        const { make,
            model,
            fuelType,
            gearTransmission, 
            kmPerDay, 
            seater, 
            pricePerDay, 
        } = req.body;
        let imageurl;
       

        //upload an image

        if(req.file) {
            imageurl = await imageUploadCloudinary(req.file.path);
            console.log('Image uploaded to Cloudinary:', imageurl);
        }

        const car = new Car({
            make,
            model,
            fuelType,
            image:  imageurl || null,
            gearTransmission,
            kmPerDay,
            seater,
            pricePerDay,
            availability : true
        })

        await car.save();
        res.status(201).json({ message : 'Car created successfully', car})
        return;
    } catch (error) {
        res.status(500).json({ message : "Server error", error})
    }
}

// GET CAR BY ID
export const getCarById = async(req, res) => {
    try {
        const { id } = req.params;
        const car = await Car.findById(id);

        if(!car) {
            return res.status(404).json({ message : "Car not found"})
        }
        res.status(200).json(car)
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
} 

//get all cars

export const getAllCars = async (req, res) =>{
    try {
        const cars = await Car.find();
        res.status(200).json({ cars})
    } catch (error) {
        res.status(500).json({ message: "Server error ", error})
    }
}

// Delete car by id

export const deleteCarById = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await Car.findByIdAndDelete(id);

        if(!car) {
            return res.status(404).json({ message : "Car not found"})
        }

        res.status(200).json({ message: "Car deleted successfully", car})
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}