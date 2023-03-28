import express from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';
import User from "../models/User.js";

const router = express.Router();
dotenv.config();

const API_KEY = process.env.SENDGRID_API_KEY;
const saltRounds = Number(process.env.SALT_ROUNDS);

sgMail.setApiKey(API_KEY);

router.post('/create', async (req, res) => {
    const {name, email, password} = req.body;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
        name,
        email,
        password: hash
    })

    try {
        const result = await newUser.save();
        
        const msg = {
            to: email, // Change to your recipient
            from: 'zader1363@gmail.com', // Change to your verified sender
            subject: 'Welcome to our Weeb Addiction Program!',
            text: 'Feel free to use our Platform to exchange about your Anime and Manga addiction with others. Stay Strong AYAYA!',
            html: '<strong>Feel free to use our Platform to exchange about your Anime and Manga addiction with others. Stay Strong AYAYA!</strong>'
        }

        sgMail
        .send(msg)
        .then((response) => {
            console.log(response[0].statusCode)
            console.log(response[0].headers)
        })
        .catch((error) => {
            console.error(error)
        })

        res.send(result);
    } catch (err) {
        res.send(err)
    }
}).post('/newsletter', async (req, res) => {
    const {name, email, password} = req.body;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const newNewsletterUser = new User({
        name,
        email,
        password: hash
    })

    try {
        const result = await newNewsletterUser.save();

        const msg = {
            to: email, // Change to your recipient
            from: 'zader1363@gmail.com', // Change to your verified sender
            templateId: 'd-33637d47f66042f3b8d01ed935c37907'
        }

        sgMail
        .send(msg)
        .then((response) => {
            console.log(response[0].statusCode)
            console.log(response[0].headers)
        })
        .catch((error) => {
            console.error(error)
        })

        res.send(result);
    } catch (err) {
        res.send(err);
    }
})

export default router;