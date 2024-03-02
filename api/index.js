const express = require('express')
const mongoose = require("mongoose")
require("dotenv").config();
const userRouter = require("./routes/user.route.js")
const authRouter = require("./routes/auth.route.js")



mongoose.connect(process.env.MONGODB_URL).then(()=>{
  
  console.log("MongoDB is connected")
}).catch((err)=>{
  console.log(err)
})
const app = express()

app.listen(3000 , ()=>{
  console.log(`Server is running on port 3000`)
})

app.use(express.json())

app.use("/api/user",userRouter)

app.use("/api/auth", authRouter)

// Create middleware

app.use((err , req , res , next )=>{
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})