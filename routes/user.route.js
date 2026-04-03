const express = require('express');


const userRouter = express.Router();
const getCurrentUser=require("../controllers/user.controller")
const isAuth=require("../middlewares/isAuth")

userRouter.get("/current-user",isAuth,getCurrentUser)

module.exports=userRouter
