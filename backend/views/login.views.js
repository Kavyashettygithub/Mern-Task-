let express=require('express')
let {loginData,registerUser}=require("../controllers/login.controllers")
let {
  agentRegister,
  getAgents,
  updateAgents,
  deleteAgents,
} = require("../controllers/addagent.controllers");
let{getDistributedLists,uploadFile}=require("../controllers/uploadcsv.controllers")
let auth=require("../Middleware/agent")
let agentAuth=require("../Middleware/agentAuth")
let {agentLogin}=require("../controllers/agentLogin.controller")
let login=express.Router();

login.post('/register',registerUser);
login.post('/loginData',loginData)
login.post('/agentRegister',auth,agentRegister)
login.post('/upload',auth,uploadFile);
login.get('/getFile',auth,getDistributedLists)
login.get('/getAgents',auth,auth,getAgents)
login.put('/updateAgent/:id',auth,updateAgents)
login.delete('/deleteAgent/:id',auth,deleteAgents)
login.post('/agentlogin',agentLogin)
module.exports=login;