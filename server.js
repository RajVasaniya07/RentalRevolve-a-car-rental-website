const express = require('express')
const Razorpay = require("razorpay");
// const razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();
const app = express()
const port = process.env.PORT || 5000
const dbConnection = require('./db')
const { initialize, putObject } = require('./index');
const { uploadFiles } = require('./index');
app.use(express.json())
const cors=require('cors')
app.use(cors({ origin: 'http://localhost:3000' }));
const connection = require("./db");
const adminAuth = require("./routes/adminAuth")
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const Admin =require('./models/admin');
const AdminUser= require('./routes/adminUser');
const Seller = require('./models/seller');
const SellerUser =require('./routes/sellerUsers');
const SellerAuth = require('./routes/sellerAuth');
const EmployeeUser = require('./routes/employeeUser');
const EmployeeAuth = require('./routes/employeeAuth');
const Employeepass=require('./routes/passwordResetEmployee');
const userpass=require('./routes/passwordResetUser');
const sellerpass=require('./routes/passwordResetSeller');
const adminpass=require('./routes/passwordResetAdmin');


const bookingsRoute=require('./routes/bookingsRoute')
initialize();


const rentalRoutes = require('./routes/rental');
app.use('/api/rentals/', rentalRoutes);
// middlewares
app.use(express.json());
app.use(cors());

app.get('/getAdmins',(req,res) => {
    Admin.find()
    .then(admin => res.json(admin))
    .catch(err => res.json(err))
})

// app.get('/getSeller',(req,res) => {
//     Seller.find()
//     .then(seller => res.json(seller))
//     .catch(err => res.json(err))
// })


// routes
app.use("/api/users", userRoutes);
app.use("/api/adminAuth",adminAuth);
app.use("/api/auth", authRoutes);
app.use("/api/password-reset-user", userpass);
app.use("/api/password-reset-seller", sellerpass);
app.use("/api/password-reset-admin", adminpass);
app.use("/api/adminUser",AdminUser);
app.use("/api/sellerUser",SellerUser);
app.use("/api/sellerAuth",SellerAuth);
app.use("/api/employeeUser",EmployeeUser);
app.use("/api/employeeAuth",EmployeeAuth);
app.use("/api/password-reset-employee", Employeepass);

app.use('/api/cars/' , require('./routes/carsRoute'))
// app.use('/api/users/' , require('./routes/usersRoute'))
app.use('/api/bookings/' , require('./routes/bookingsRoute'))
// app.use('/api/upload/' , require('./routes/imageRoute'))
app.use('/api/userdetails/' , require('./routes/userRoute'))
app.use('/api/sellerdetails/' , require('./routes/sellerRoute'))

const path = require('path')

if(process.env.NODE_ENV==='production')
{

    app.use('/' , express.static('client/build'))

    app.get('*' , (req , res)=>{

          res.sendFile(path.resolve(__dirname, 'client/build/index.html'));

    })

}

// POST method for uploading one image
app.post('/api/upload', async (req, res) => {
    try {
        const { filename, contentType } = req.body;
        const url = await putObject(filename, contentType);
        // console.log(filename);
         const objectUrl = `https://rajpatel.s3.ap-south-1.amazonaws.com//uploads/user-uploads/${encodeURIComponent(filename)}`;
        res.json({ url, objectUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/uploadMultiple', async (req, res) => {
    try {
        const filesArray = req.body.files; // Accessing filesArray from the request body
        console.log("Received files:", filesArray);

        // Array to store URLs for each uploaded image
        const urls = [];

        // Upload each image and store the URLs
        for (const { filename, contentType } of filesArray) {
            console.log("Uploading file:", filename);
            const url = await putObject(filename, contentType);
            console.log("Uploaded successfully:", url);

            // Construct object URL based on the uploaded filename
            const objectUrl = `https://rajpatel.s3.ap-south-1.amazonaws.com//uploads/user-uploads/${encodeURIComponent(filename)}`;

            // Push the URL and object URL to the array
            urls.push({ url, objectUrl });
        }

        // Send the URLs as a response
        res.json({ urls });
        console.log("Uploaded URLs:", urls);
    } catch (error) {
        console.error("Error occurred during file upload:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post("/order", async (req,res) => {

    try{

    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET,
    });

    const options=req.body;
    const order= await razorpay.orders.create(options);

    if(!order) {
        return res.status(500).send("Error");
    }
 
    res.json(order);
}catch(err){
    console.log(err);
    res.status(500).send("Error");
}

});
app.post("/order/validate", async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
  
    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    //order_id + "|" + razorpay_payment_id
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");
    if (digest !== razorpay_signature) {
      return res.status(400).json({ msg: "Transaction is not legit!" });
    }
  
    res.json({
      msg: "success",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  });


// app.get('/editcar/:carid', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'editcar.html'));
//   });


app.listen(port, () => console.log(`Node JS Server Started in Port ${port}`))


