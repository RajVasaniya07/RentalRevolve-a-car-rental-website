const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const dbConnection = require('./db')
const { initialize, putObject } = require('./index');
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

app.post('/api/upload', async (req, res) => {
    try {
        const { filename, contentType } = req.body;
        const url = await putObject(filename, contentType);
        const objectUrl = `https://rajpatel.s3.ap-south-1.amazonaws.com//uploads/user-uploads/${encodeURIComponent(filename)}`;


        res.json({ url, objectUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// app.get('/editcar/:carid', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'editcar.html'));
//   });


app.listen(port, () => console.log(`Node JS Server Started in Port ${port}`))
