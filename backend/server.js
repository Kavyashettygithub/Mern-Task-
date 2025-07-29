require('dotenv').config();
let express=require("express")
let cors=require("cors");
let mongoose=require("mongoose");
let loginRouter=require("../backend/views/login.views")

let app=express();
app.use(express.json())
app.use(cors())

app.use('/api/login',loginRouter)
app.use('/{*any}',(req,res,next)=>{
    return res.json({error:true,message:"page not found"})
})

let loginData=async(req,res,next)=>{
    try {
        await mongoose.connect(process.env.mongo_url);
        console.log("mongodb connected successfully")
        app.listen(3000,()=>{
            console.log("the server is running in the port: http://localhost:3000")
        })
    } catch (error) {
        next(error)
    }
}
loginData()
