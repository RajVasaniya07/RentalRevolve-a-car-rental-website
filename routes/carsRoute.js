const express = require("express");
const router = express.Router();
const Car = require("../models/carModel");

router.get("/getallcars", async (req, res) => {
  try {
    const cars = await Car.find();
    res.send(cars);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/addcar", async (req, res) => {
  try {
    console.log("%%%%%%% Trying to save car:", req.body);
    const newcar = new Car(req.body);
    await newcar.save();
    console.log("%%%%%%% Car saved successfully:", newcar);
    res.status(201).json({ message: "Car added successfully", car: newcar });
  } catch (error) {
    console.error("%%%%%%% Error saving car:", error);
    if (error.name === "ValidationError") {
      // Mongoose validation error
      return res.status(400).json({ error: "Validation failed", details: error.errors });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
});


router.post("/editcar", async (req, res) => {
  try {
    const car = await Car.findOne({ _id: req.body._id });
    car.name = req.body.name;
    car.image = req.body.image;
    car.capacity = req.body.capacity;
    car.fuelType = req.body.fuelType;
    car.year=req.body.year;
    car.mileage=req.body.mileage;
    car.carType=req.body.carType;
    car.rentPerHour = req.body.rentPerHour;
    

    await car.save();

    res.send("Car details updated successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/deletecar", async (req, res) => {
  try {
    await Car.findOneAndDelete({ _id: req.body.carid });

    res.send("Car deleted successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;