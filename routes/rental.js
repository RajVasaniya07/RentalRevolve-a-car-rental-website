// Import necessary dependencies
const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');
const carModel = require('../models/carModel');

const sendEmail = require("../utils/sendEmail");
// Route to handle the form submission
router.post('/addRental', async (req, res) => {
    try {
      const rentalData = req.body; // Extract rental data from the request body
      const newRental = new Rental(rentalData); // Create a new instance of the Rental model with the rental data
        console.log(rentalData)
      // Save the new rental to the database
      const savedRental = await newRental.save();
  
      // Format the rental data for the email
      const emailContent = `
        Rental Information:
        Renter Name: ${rentalData.renterName}
        Pickup Time: ${rentalData.pickupTime}
        Drop Time: ${rentalData.dropTime || 'Not specified'}
        Suggestion/Complaint: ${rentalData.suggestionComplaint || 'Not provided'}
        Email: ${savedRental.email}
        Document Verified: ${rentalData.documentVerified ? 'Yes' : 'No'}
        Status: ${rentalData.status}
        Car ID: ${rentalData.carId}
       
      `;
  
      // Send the email with the formatted content
      await sendEmail(rentalData.email, "Rental Information", emailContent);
  
      // Respond with a success message
      res.json({ message: 'Email sent successfully!', savedRental });
    } catch (error) {
      // Handle errors, send an error response, or log the error
      console.error('Error saving rental or sending email:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });





const { sendEmailToSeller } = require('../../RentalRevolve/utils/Email'); // Create this utility function

// Route to check car in MongoDB and send email
router.post('/check-car-and-send-email', async (req, res) => {
  try {
    const { carId, renterName, email, } = req.body;

    // Check the car in MongoDB
    const carExists = await carModel.find({_id : carId });
    // console.log(carExists[0].email);
    if (carExists) {


      // Car exists, send email to the seller
      await sendEmail(carExists[0].email,"Rental Information", JSON.stringify(req.body));

      res.json({ message: 'Email sent successfully!' });
    } else {
      res.status(404).json({ message: 'Car not found in the database.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});



router.get("/getallRental", async (req, res) => {
  try {
    const cars = await Rental.find();
    res.send(cars);
  } catch (error) {
    return res.status(400).json(error);
  }
});


router.post("/editRental", async (req, res) => {
  try {
    console.log("1");
    
//   console.log(req.body);
    var rentalData = await Rental.findOne({ _id: req.body._id });
    // rental.dropTime =req.body.dropTime;
    // rental.status= req.body.status;
    
    // console.log(rentalData);

    // console.log(req.body.status);

    var result =await Rental.updateOne(
      { _id: req.body._id },
      { $set: { status: req.body.status,dropTime:req.body.dropTime,totalAmount:req.body.totalAmount,suggestionComplaint:req.body.suggestionComplaint } }
  );
  console.log(result);

  rentalData=req.body;
  
    
    console.log(rentalData);
      // Format the rental data for the email
      const emailContent = `
        Rental Information:
        Renter Name: ${rentalData.renterName}
        Pickup Time: ${rentalData.pickupTime}
        Drop Time: ${rentalData.dropTime || 'Not specified'}
        Suggestion/Complaint: ${rentalData.suggestionComplaint || 'Not provided'}
        // Total Amount: ${rentalData.totalAmount || 'Not provided'}
        Email: ${rentalData.email}
        Document Verified: ${rentalData.documentVerified ? 'Yes' : 'No'}
        Status: ${rentalData.status}
        Car ID: ${rentalData.carId}
        // Booking ID: ${rentalData.bookingId}
      `;
      console.log(rentalData.email);
  
      // Send the email with the formatted content
      await sendEmail(rentalData.email, "Rental Information", emailContent);
  
    res.send("rental details updated successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});
module.exports = router;


// router.delete('/api/rentals/delete-pending/:id', async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Find and delete the rental with the given ID and "pending" status
//     const deletedRental = await Rental.findOneAndDelete({ _id: id, status: 'pending' });

//     if (!deletedRental) {
//       return res.status(404).json({ message: 'Rental not found or status is not pending' });
//     }

//     return res.status(200).json({ message: 'Rental deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting rental:', error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// });