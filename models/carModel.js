const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email:{type: String, required: false},
    image: { type: String, required: true },
    availability: { type: Boolean, default:true },
    images: [String],
    capacity: { type: Number, required: true },
    fuelType: { type: String, required: true },
    year: { type: Number, required: true }, // New attribute: Year
    mileage: { type: Number, required: true }, // New attribute: Mileage (in km/liter)
    carType: { type: String, required: true }, // New attribute: Car Type (Automatic/Manual)
    bookedTimeSlots: [
        {
            from: { type: String, required: true },
            to: { type: String, required: true }
        }
    ],
    rentPerHour: { type: Number, required: true }
}, { timestamps: true });

const carModel = mongoose.model('cars', carSchema);
module.exports = carModel;