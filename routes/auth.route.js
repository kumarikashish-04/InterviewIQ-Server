const express = require('express');
const authRouter = express.Router();
const {googleAuth,logout}=require("../controllers/auth.controllers")
const isAuth=require("../middlewares/isAuth")

authRouter.post("/google",googleAuth)
authRouter.get("/logout",isAuth,logout)




module.exports=authRouter
