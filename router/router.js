import * as dotenv from "dotenv";
dotenv.config();
const router=express.Router();
import express from "express";
import nodemailer from "nodemailer";

router.post("/home",  (req, res) => {

    // const { email } = req.body;
    // const { sub } = req.body;
    // const { message } = req.body;
  

    try {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: req.body.email,
            subject: req.body.sub,
            text:req.body.message
            
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error" + error)
            } else {
                console.log("Email sent:" + info.response);
                res.status(201).json({status:201,info})
            }
        })

    } catch (error) {
        console.log("Error" + error);
        res.status(401).json({status:401,error})
    }
});


export default router;