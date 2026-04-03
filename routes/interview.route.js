const express=require("express")
const {upload}=require("../middlewares/multer")
const{ analyzeResume, generateQuestion, submitAnswer, finishInterview, getMyinterviews, getInterviewReport} = require("../controllers/interview.controller")
const isAuth=require("../middlewares/isAuth")



const interviewRouter=express.Router()


interviewRouter.post("/resume",isAuth,upload.single("resume"),
analyzeResume)
interviewRouter.post("/generate-questions",isAuth,generateQuestion)
interviewRouter.post("/submit-answer",isAuth,submitAnswer)
interviewRouter.post("/finish",isAuth,finishInterview)
interviewRouter.get("/get-interview",isAuth,getMyinterviews);
interviewRouter.get("/report/:id",isAuth,getInterviewReport)


module.exports=interviewRouter