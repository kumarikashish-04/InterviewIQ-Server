
const jwt=require("jsonwebtoken");


const isAuth=async(req,res,next)=>{
    try{
        let {token}=req.cookies;
        if(!token){
            return res.status(401).json({message:"Unauthorized"})
        }
        //verify token
        const verifyToken=jwt.verify(token,process.env.JWT_SECRET);

        //if valid, attach user to req and call next()
        //else return 401
        if(verifyToken){
            req.userId=verifyToken.userId;
            next();
        } else {
            return res.status(401).json({message:"Unauthorized"})
        }
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Internal Server Error"})
    }
}

module.exports=isAuth;