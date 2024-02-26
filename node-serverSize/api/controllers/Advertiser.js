const advertiser=require("../models/Advertiser")
const nodemailer = require('nodemailer')
// var send = require('gmail-send');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();
const bcrypt = require('bcryptjs');
const sendWelcomeEmail = require('../../sendWelcomeEmail');
const Advertiser = require("../models/Advertiser");



const advertiserLogin = (req, res) => {
    const { email, password } = req.params;

    // Find the client by email
    advertiser.findOne({ email })
        .then(advertiser => {
            if (!advertiser) {
                return res.status(404).send({ message: 'User not found' });
            }

            // Validate password
            bcrypt.compare(password, advertiser.password)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.status(401).send({ message: 'Invalid credentials' });
                    }

                    // Generate JWT token
                    const token = jwt.sign(
                        { id: advertiser._id, email: advertiser.email },
                        process.env.TOKEN,
                        { expiresIn: '1h' } // Token expires in 1 hour
                    );

                    // Send a welcome message
                    res.status(200).send({ message: 'Hello', token , advertiser});
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
//רישום מפרסם חדש
const advertiserRegister = (req, res) => {
    const { email, password, phone, aditionPhone, houses } = req.body;

    // Check if user with the given email already exists
    advertiser.findOne({ email: email })
        .then(existingUser => {
            if (existingUser) {
                return res.status(400).send({ message: 'User with this email already exists' });
            }

            // Generate JWT token
            const token = jwt.sign(
                { email },
                process.env.TOKEN,
                { expiresIn: '1h' } // Token expires in 1 hour
            );

            // Hash the password
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).send({ message: 'Internal server error', error: err.message });
                }
                // Create a new client with hashed password
                const newAdvertiser = new advertiser({ email, password: hash, phone, aditionPhone, houses });
                newAdvertiser.save()
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
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        });

                        res.status(200).send({ user: { email }, token });
                    })
                    .catch(error => {
                        res.status(400).send({ message: 'Error registering user', error: error.message });
                    });
            });
        })
        .catch(error => {
            res.status(500).send({ message: 'Error checking user existence', error: error.message });
        });
    }

       const forgetPassword = (req, res) => {
            const email = req.params.email
    
    
            const num =(Number).parseInt(Math.random(10000,99999)*100000) 
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'tzippy0898@gmail.com',
                    pass: 'oubh qudw kocz xjjq'
                }
            });
            let mailOptions = {
                from: 'tzippy0898@gmail.com',
                to: email,
                subject: `Hi, yor verify code is ${num} `,
                text: 'Wellcome to our organization!\n You are administrator.'
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    res.status(200).send({error})
    
                }
                else {
                     console.log('Email sent: ' + info.response);
                     res.status(200).send(num)
    
                }
            });
            //   res.status(200).send({num})
        }
      const  getAll= (req, res) => {
           Advertiser.find()
                .then((users) => { res.status(200).send({ users }) })
                .catch((error) => { res.status(404).send({ message: error.message }) })
        }


module.exports={advertiserRegister,advertiserLogin,forgetPassword,getAll}