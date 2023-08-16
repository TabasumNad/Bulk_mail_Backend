import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import express from "express";
const app = express();
import mongoose from 'mongoose';
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import {FormModel} from './models/Form.js'

// import {router} from './routers/register.js'


app.use(bodyParser.json());

app.use(express.json())
app.use(cors())


// mongoose.connect("mongodb://127.0.0.1:27017/form");
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Connected successfully!'));
// const client=mongoose.model


app.post("/login",(req,res)=>{
    const {email,password}=req.body;
    FormModel.findOne({email:email})
    .then(user=>{
        if(user){
        if(user.password === password){
            res.json("Success")
        } else {
            res.json("password incorrect")
        } 
     } else{

            res.json("No recored exist")
        }
    
    })
})

app.post('/register',(req,res)=>{
    const {email, password}=req.body;
    FormModel.create({email:email})
    .then(form=>res.json(form))
    .catch(err=>res.json(err))

})


// app.use('/register',router)


app.get("/register", async function (req, res) {
   
    const getinfo=await FormModel.find()
    console.log(getinfo)
     res.send(getinfo);
  });
  



        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        app.post('/send-emails', async (req, res) => {
            const { recipients, subject, message } = req.body;

            try {
                const mailOptions = {
                  from: process.env.EMAIL,
                  to: recipients, 
                  subject,
                  text: message,
                };

                await transporter.sendMail(mailOptions);
                res.send({ message: 'Emails sent successfully' });
              } catch (error) {
                console.error('Error sending emails:', error);
                res.status(500).send({ message: 'Error sending emails' });
              }
            });



const PORT = 4000;
app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩 Welcome To backend of Bulk Email Sending Website");
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
