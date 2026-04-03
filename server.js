require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth.route');
const userRouter = require('./routes/user.route');
const interviewRouter = require('./routes/interview.route');
const paymentRouter = require('./routes/payment.route');

const app = express();
app.use(express.json());
 app.use(cors(
    {
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials:true
    }
 ));

 
app.use(cookieParser())

app.use("/api/auth",authRouter);
app.use("/api/user",userRouter)
app.use("/api/interview",interviewRouter)
app.use("/api/payment",paymentRouter)
app.get("/api/health", (req, res) => {
    res.json({ status: "Server is running ✅" });
  });
connectDB();

const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} with http://localhost:${PORT}    `);
});