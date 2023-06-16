import express from "express";
import { Router } from "express"; 

router.get("/register", async function (req, res) {
   
    const getinfo=await FormModel.find()
    console.log(getinfo)
     res.send(getinfo);
  });

  module.export=router;