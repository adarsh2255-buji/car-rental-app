import Booking from "../model/BookingModel.js";
import Car from "../model/carModel.js"
import User from "../model/userModel.js"
 
//function to calculate total price
const calculateTotalPrice = (pricePerDay, pickUpDateAndTime, dropOffDateAndTime) =>{
    const pickUpDate = new Date(pickUpDateAndTime);
    const dropOffDate = new Date(dropOffDateAndTime);
    const days = Math.ceil((dropOffDate - pickUpDate)/(1000 * 60 * 60 * 24));
    return days * pricePerDay;
}

const totalDays = (dropOffDateAndTime, pickUpDateAndTime)=>{
    const dropOffDate = new Date(dropOffDateAndTime);
    const pickUpDate = new Date(pickUpDateAndTime);
    const timeDifference = dropOffDate - pickUpDate;

    if (timeDifference < 0) {
        throw new Error("Drop-off date must be after pick-up date");
    }

    const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return days;
}

//update booking status
const updateBookingStatus = (booking) =>{
    const currentDate = new Date();
    const pickUpDate = new Date(booking.pickUpDateAndTime);
    const dropOffDate = new Date(booking.dropOffDateAndTime);

    if(currentDate < pickUpDate){
        booking.status = 'Booked';
    } else if(currentDate >= pickUpDate && currentDate <=dropOffDate){
        booking.status = 'On Journey';
    } else if( currentDate > dropOffDate) {
        booking.status = "Journey Completed"
    }
}
//car booking function
export const carBooking = async (req, res) =>{
    try {
        const { 
            user,
            car,
            pickUpLocation,
            pickUpDateAndTime,
            dropOffLocation,
            dropOffDateAndTime } = req.body

            //total days
            const totalNoOfDays = totalDays(dropOffDateAndTime, pickUpDateAndTime);

            //car availablity
            const bookedCar = await Car.findById(car);
            if(!bookedCar){
               return res.status(404).json({ message : "Car not found"})
            }

            if(!bookedCar.availability){
               return res.status(400).json({ message : "Car is not available"})
            }

             
            //total price
            const totalPrice = calculateTotalPrice(bookedCar.pricePerDay, pickUpDateAndTime, dropOffDateAndTime)
           
            if (isNaN(totalNoOfDays) || totalNoOfDays <= 0) {
                return res.status(400).json({ message: "Invalid booking dates" });
            }
            
            //create booking
            const booking = new Booking({
                user,
                car,
                pickUpLocation,
                pickUpDateAndTime,
                dropOffLocation,
                dropOffDateAndTime,
                totalPrice,
                totalNoOfDays,
            })

            await booking.save();

            //update car availability
            bookedCar.availability = false;
            await bookedCar.save()
 
            return res.status(201).json({ message : "Car booked successfully", booking})
            
            
    } catch (error) {
        console.log(error)
        res.status(500).json({ message : "Server error", error})
    }
}


//get booking by ID

export const carBookingById  = async(req, res) =>{
    try {
        const { id } = req.params;
        const booking = await Booking.findById(id).populate('user').populate('car');

        if(!booking) {
            return res.status(404).json({ message : "Booking not found"})
        }
        updateBookingStatus(booking);
        await booking.save();
        res.status(200).json(booking)
    } catch (error) {
        return res.status(500).json({ message : "Server error", error})
    }
}


//get all booking
export const getAllCarBooking = async(req, res) =>{
    try {
        const bookings = await Booking.find().populate('user').populate('car');

        // bookings.forEach(async (booking) => {
        //     updateBookingStatus(booking);
        //     await booking.save()            
        // });
        res.status(200).json({ bookings })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

//cancel booking
 
export const cancelBooking = async (req, res) =>{
    try {
        const { bookingId} = req.params;
        //booking by id
        const booking = await Booking.findById(bookingId).populate('car');
        if(!booking) {
            return res.status(404).json({ message : "Booking not found"});
        }

        //update booking status
        booking.status = 'cancelled';
        await booking.save();
 
        //update car availability
        const car = await Car.findById(booking.car._id);
        if(car) {
            car.availability = true;
            await car.save()
        }
        return res.status(200).json({ message : 'Booking cancelled successfully', booking})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error });
    }
}  