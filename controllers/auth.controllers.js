const genToken = require("../config/token")
const userModel = require("../models/user.model")

const googleAuth = async(req, res) => {

    try{
        const {name,email}=req.body

        let user=await userModel.findOne({email})
        if(!user){
            user=await userModel.create({name,email})
        }
        let token =genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge:7*24*60*60*1000
        })

        res.status(200).json({message:"Google Auth Successful", success:true,user})
    }
    catch(error){
        console.error("Error in Google Auth Controller:", error)
        res.status(500).json({message:"Internal Server Error"})
    }
}


const logout=async(req,res)=>{
    try{
        await res.clearCookie("token")
        return res.status(200).json({message:"Logged out successfully"})
    }
    catch(error){
        console.error("Error in Logout Controller:", error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

module.exports={googleAuth,logout}
