let addAgent=require("../model/addagent.schema")
let bcrypt=require("bcrypt")

let agentRegister=async(req,res,next)=>{
    try {
        let { name, email, mobno, password } = req.body;
        if(!name || !email || !mobno || !password){
            return res.json({error:true, message:"please fill the field"})
        }
        const existing=await addAgent.findOne({email});
        if(existing){
            return res.json({error:true, message:"email already exists"})
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const agent= await addAgent.create({name,email,mobno,password:hashedPassword})
        return res.json({error:false,message:"agent registerd",agent})
    } catch (error) {
        next(error)
    }
}

module.exports={agentRegister};