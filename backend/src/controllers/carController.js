import Car from "../model/carModel.js";
import multer from 'multer'
import path from 'path'

//multer file storage

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage});

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
        const image = req.file.path;

        const car = new Car({
            make,
            model,
            fuelType,
            image,
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
export const uploadCarImage = upload.single('image')
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