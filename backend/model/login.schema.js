let {model,Schema}=require("mongoose")
let bcrypt=require("bcrypt")
let loginSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
    }
})
// Hash password before saving
loginSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next()
});

// Method to compare passwords
loginSchema.methods.comparePassword=async function (password) {
    return bcrypt.compare(password, this.password)
}

let loginformdata=model("login",loginSchema)
module.exports=loginformdata