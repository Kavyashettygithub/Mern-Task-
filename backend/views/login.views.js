let express=require('express')
let {loginData,registerUser}=require("../controllers/login.controllers")
let{agentRegister}=require("../controllers/addagent.controllers")
let{getDistributedLists,uploadFile}=require("../controllers/uploadcsv.controllers")

let login=express.Router();

login.post('/register',registerUser);
login.post('/loginData',loginData)
login.post('/agentRegister',agentRegister)
login.post('/upload',uploadFile);
login.get('/getFile',getDistributedLists)

module.exports=login;