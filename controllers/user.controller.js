const {genToken} = require("../config/token")
const User = require("../models/user.model")


const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId; // Assuming userId is set in the isAuth middleware
        const user =await User.findById(userId)// Exclude password from the response
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Internal Server Error"})
    }
}

module.exports=getCurrentUser;