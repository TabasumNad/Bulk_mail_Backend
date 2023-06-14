import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
// import router from "./router/router.js"
import express from "express";
const app = express();
import mongoose from 'mongoose';
import nodemailer from "nodemailer";
import {FormModel} from './models/Form.js'

// import nodemailer from "nodemailer";




app.use(express.json())
app.use(cors())
// app.use(router)

// const client = new mongoose.client("mongodb://127.0.0.1:27017/form");
// await client.connect();
// console.log("Mongo Connected!!!");

mongoose.connect("mongodb://127.0.0.1:27017/form");
// const client=mongoose.model


app.post("/login",(req,res)=>{
    const {email, password}=req.body;
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


// app.get("/register", (req, res)=> {
//     FormModel.findOne({email:email})
//     .then(form=>res.json(form))
//     .catch(err=>res.json(err))

//     // console.log(request.query);
//     //   const movies=await getAllMovies(request.query);
//                    console.log();
//                     //   response.send(movies);
      
//     });



app.get("/register", async function (req, res) {
    // const getinfo = await FormModel.db("form").collection("forms").find({}).toArray();
    const getinfo=await FormModel.find()
    console.log(getinfo)
     res.send(getinfo);
  });
  



app.post("/home",  (req, res) => {

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


const PORT = 4000;
app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩HELLOOOO");
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
