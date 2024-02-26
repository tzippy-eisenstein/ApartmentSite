const Client=require("../models/Client")
// var send = require('gmail-send');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();
const bcrypt = require('bcryptjs');
const sendWelcomeEmail = require('../../sendWelcomeEmail');


const clientLogin = (req, res) => {
    // const { email, password } = req.params;
    const { email, password } = req.params;

    // Find the client by email
    Client.findOne({ email })
        .then(client => {
            if (!client) {
                return res.status(404).send({ message: 'User not found' });
            }

            // Validate password
            bcrypt.compare(password, client.password)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.status(401).send({ message: 'Invalid credentials' });
                    }
               
                    // Generate JWT token
                    const token = jwt.sign(
                        { id: client._id, email: client.email },
                        process.env.TOKEN,
                        { expiresIn: '1h' } // Token expires in 1 hour
                    );

                    // Send a welcome message
                    res.status(200).send({ message: 'Hello', token });
                })
                .catch(error => {
                    res.status(500).send({ message: 'Internal server error', error: error.message });
                });
        })
        .catch(error => {
            res.status(500).send({ message: 'Internal server error', error: error.message });
        });
};
/////////////////
const nodemailer = require('nodemailer');


const clientRegister = (req, res) => {
    const { email, password } = req.body;
 
    
    // Check if user with the given email already exists
    Client.findOne({ email: email })
        .then(existingUser => {
            if (existingUser) {
                return res.status(400).send({ message: 'User with this email already exists' });
            }
        
    // Generate JWT token
    const token = jwt.sign(
        {  email },
        process.env.TOKEN,
        { expiresIn: '3h' } // Token expires in 1 hour
    );

    // Hash the password
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).send({ message: 'Internal server error', error: err.message });
        }

        // Create a new client with hashed password
        const newClient = new Client({ email, password: hash });
        newClient.save()
            .then(() => {
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    
                    auth: {
                        user: 'tzippy0898@gmail.com',
                        pass: 'oubh qudw kocz xjjq'
                    },

                });
                // יצירת הודעת דוא"ל עם התבנית המעוצבת
                const mailOptions = {
                    from: 'tzippy0898@gmail.com',
                    to: email,
                    subject: 'Welcome to Our Platform!',
                    html: sendWelcomeEmail(email)
                };
                

    // שליחת הודעת הדוא"ל
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
                
                res.status(200).send({ user: { email }, token });
                // res.status(200).send({ message: 'User registered successfully' });
            })
            .catch(error => {
                res.status(400).send({ message: 'Error registering user', error: error.message });
            });
    });
        
});
}
const  getAll= (req, res) => {
    Advertiser.find()
         .then((users) => { res.status(200).send({ users }) })
         .catch((error) => { res.status(404).send({ message: error.message }) })
 }


module.exports={clientRegister,clientLogin,getAll}