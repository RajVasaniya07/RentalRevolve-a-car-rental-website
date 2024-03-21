// Import necessary dependencies
const mongoose = require('mongoose');

// Define the schema for the Rental model
const rentalSchema = new mongoose.Schema({
  renterName: { type: String, required: true },
  carId: { type: String, required: true },
  bookingId: { type: String },
  status:{type: String, default: false},
  // paymentId: { type: String },
  pickupTime: { type: Date, required: true },
  dropTime: { type: Date, },
  suggestionComplaint: { type: String },
  totalAmount: { type: Number},
  email: { type: String, required: true },
  documentVerified: { type: Boolean, default: false },
}, { timestamps: true });

// Create the Rental model using the schema
const Rental = mongoose.model('Rentalreport', rentalSchema);

// Export the model
module.exports = Rental;