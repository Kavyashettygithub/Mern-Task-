let login=require("../model/login.schema")
let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken")


const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        error: true,
        message: "Email and password are required",
      });
    }

    const userExists = await login.findOne({ email });
    if (userExists) {
      return res.json({ error: true, message: "User already exists" });
    }

    const newUser = await login.create({ email, password });
    return res.json({
      error: false,
      message: "User registered successfully",
      user: { id: newUser._id, email: newUser.email },
    });
  } catch (error) {
    next(error);
  }
};

let loginData=async(req,res,next)=>{
    try{
        const{email,password}=req.body;
        //validate input
        if(!email || !password){
            return res.json({error:true,message:"email and password are required"})
        }
        // Find user
        const user=await login.findOne({email})
        if(!user){
            return res.json({error:true, message:"invalid email or password"})
        }

         // Compare password
         const isMatch=await bcrypt.compare(password,user.password)
         if(!isMatch){
            return res.json({error:true, message:"Invalid email or password"})
         }
         //Generate token
         const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:"1h"
         })
         res.json({error:false,message:"login successfully",token,user:{email:user.email,id:user._id}})
    }catch(error){
        next(error)
    }
}

module.exports={loginData, registerUser}