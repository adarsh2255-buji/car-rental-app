import Booking from "../model/BookingModel.js";
import Car from "../model/carModel.js";
import User from "../model/userModel.js"

//get all user
export const getAllUsers = async (req, res) => {
    try {
        const user = await User.find().select('-password');
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message : "Server erro", error})
    }
};

//delete user by id

export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

//get all booking
export const getAllBookings = async (req, res) =>{
    try {
        const booking = await Booking.find().populate( 'user car');
        res.status(200).json({ booking })
    } catch (error) {
        res.status(500).json({message : "Server error" , error })
    }
}

//delete booking by id

export const deleteBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const booking = await Booking.findByIdAndDelete(bookingId);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json({ message: "Booking deleted", booking });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

//update car availability

export const carAvailability = async (req, res) =>{
    try {
        const { carId, availability } = req.body;
        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }

        car.availability = availability;
        res.status(200).json({ message: "Car availability updated", car });
        await car.save();
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

