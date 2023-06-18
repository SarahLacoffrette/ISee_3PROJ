const db = require('../database/db')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
require("dotenv").config();

const createRequest = (req, res) => {
    const id_user = req.body.id_user;
    const verification = false;
    const token = jwt.sign({
        id: id_user
    }, process.env.TOKEN_KEY);
    const values = [id_user, token, verification];
    const sql = "INSERT INTO RequestEmail (id_user, token, verification) VALUES (?, ?, ?)";
    db.query(sql, values, (err, result) => {
        if (err) throw err;
        res.json({token});
    });

}

const validateEmail = (req, res) => {
    const token = req.body.token;
    const sql = "UPDATE RequestEmail SET verification = true WHERE token = ?";
    db.query(sql, token, (err, result) => {
        if (err) throw err;
        res.json({success: true, message: "Request valid"});
    });

}


const sendMail = (req, res) => {
    const email = req.body.email;
    const token = req.body.token;
    const transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: 'isee.contact.web@gmail.com',
            pass: 'izbsxubvxfyhyvmu'
        }
    }));

    const mailOptions = {
        from: 'isee.contact.web@gmail.com',
        to: email,
        subject: 'Confirmation de votre compte',
        text: 'Bonjour ! Voici votre lien de validation : http://localhost:3000/activation?token=' + token
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return res.status(400).json({ success: false, error: "Can't send the email" });
        } else {
            return res.status(200).json({ success: true, message: "Email sent successfully" });
        }
    });
}

const sendMailTicket = (req, res) => {
    const email = req.body.email;
    const text = req.body.text;
    const transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
            user: 'isee.contact.web@gmail.com',
            pass: 'izbsxubvxfyhyvmu'
        }
    }));

    const mailOptions = {
        from: 'isee.contact.web@gmail.com',
        to: email,
        subject: 'Réponse à votre ticket',
        text: text
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return res.status(400).json({success: false, error: "Can't send the email"});
        } else {
            return res.status(200).json({success: true, message: "Email sent"});
        }
    });
}

module.exports = {createRequest, sendMail, validateEmail, sendMailTicket};