const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const clientRouter=require('./api/routers/Client')
const advertiserRouter=require('./api/routers/Advertiser')
const categoryRouter=require('./api/routers/Category')
const cityRouter=require('./api/routers/City')
const apartmentRouter=require('./api/routers/Apartments')
app.use(express.json())

const path=require('path')

const cors = require('cors');
app.use(cors());

const connectDB = require('./connectToDB')

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Load environment variables from .env file
dotenv.config();

connectDB()


// Connection parameters for mongoose
const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
};


// Routes
app.use('/clients',clientRouter)
app.use('/advertiser',advertiserRouter)
app.use('/category', categoryRouter)
app.use('/city',cityRouter)
app.use('/Apartment',apartmentRouter)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const sendmail = require('sendmail')();
 
sendmail({
    from: 'tzippy0898@gmail.com',
    to: 'tzippy0898@gmail.com',
    subject: 'test sendmail',
    html: 'Mail of test sendmail ',
  }, function(err, reply) {
    console.log(err && err.stack);
});


// Start the server
app.listen(3001, () => {
    console.log(`my app is listening in http://localhost:3001`);
});
