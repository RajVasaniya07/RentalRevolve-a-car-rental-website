const express = require("express");
const router = express.Router();
const{ Seller, validate } = require("../models/seller");

router.get("/getallseller", async(req, res) => {

    console.log("geting");
    try {
  
        const seller = await Seller.find();

        res.send(seller);
        
    } catch (error) {
        return res.status(400).json(error);
    }
  
  });
  
  module.exports = router;