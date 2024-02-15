const mongoose = require("mongoose");
mongoose.set('strictQuery', false); // Add this line to your Mongoose configuration


const userSchema = new mongoose.Schema({
    googleId:String,
    displayName:String,
    email:String,
    image:String
},{timestamps:true});


const userdb = new mongoose.model("users",userSchema);

module.exports = userdb;

// const userDetailSchema = new mongoose.Schema({
// email:{
//             type:String,
//             required: true
// },
// password:{
//     type:String
// },

// })

// const collection = mongoose.model("collections",userDetailSchema)


// module.exports = collection;


