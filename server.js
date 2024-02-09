const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const dbConnection = require('./db')
const { initialize, putObject } = require('./index');
const { uploadFiles } = require('./index');
app.use(express.json())
const cors=require('cors')
app.use(cors({ origin: 'http://localhost:3000' }));
initialize();

app.use('/api/cars/' , require('./routes/carsRoute'))
// app.use('/api/users/' , require('./routes/usersRoute'))
// app.use('/api/bookings/' , require('./routes/bookingsRoute'))
// app.use('/api/upload/' , require('./routes/imageRoute'))

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



// app.get('/editcar/:carid', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'editcar.html'));
//   });


app.listen(port, () => console.log(`Node JS Server Started in Port ${port}`))


