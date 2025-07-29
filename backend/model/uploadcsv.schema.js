let {model,Schema}=require("mongoose")

let uploadCsv=new Schema({
    agentId:Number,
    items:[
        {
            firstName:String,
            phone:String,
            notes:String
        }
    ]
})
module.exports=model("uploadCsv",uploadCsv)