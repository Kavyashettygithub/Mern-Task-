let {model,Schema}=require("mongoose");
let bcrypt=require("bcrypt")

let addAgentSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    mobno:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

addAgentSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    try {
        let salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error)
    }
})

addAgentSchema.methods.compare=async function(password){
    return await bcrypt.compare(password,this.password)
}

module.exports=model("addAgentSchema",addAgentSchema)