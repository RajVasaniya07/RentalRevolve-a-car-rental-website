const mongoose = require("mongoose");

function connectDB(){

    mongoose.connect('mongodb+srv://meetvisodiya3:meetvisodiya3@cluster0.eetbwu7.mongodb.net/RentalRevolve-udemy' , {useUnifiedTopology: true , useNewUrlParser: true})

    const connection = mongoose.connection

    connection.on('connected' , ()=>{
        console.log('Mongo DB Connection Successfull')
    })

    connection.on('error' , ()=>{
        console.log('Mongo DB Connection Error')
    })


}

connectDB()

module.exports = mongoose