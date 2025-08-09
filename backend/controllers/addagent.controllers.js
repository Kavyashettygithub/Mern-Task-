let addAgent = require("../model/addagent.schema");
let bcrypt = require("bcrypt");

let agentRegister = async (req, res, next) => {
  try {
    let { name, email, mobno, password } = req.body;
    if (!name || !email || !mobno || !password) {
      return res.json({ error: true, message: "Please fill all the fields" });
    }

    const existing = await addAgent.findOne({ email, userId: req.user.id });
    if (existing) {
      return res.json({
        error: true,
        message: "Email already exists for this user",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const agent = await addAgent.create({
      userId: req.user.id,
      name,
      email,
      mobno,
      password: hashedPassword,
    });

    return res.json({ error: false, message: "Agent registered", agent });
  } catch (error) {
    next(error);
  }
};

let getAgents = async (req, res, next) => {
  try {
    const agents = await addAgent.find({ userId: req.user.id });
    return res.json({
      error: false,
      message: "All agents fetched successfully",
      data: agents,
    });
  } catch (error) {
    next(error);
  }
};

let updateAgents = async (req, res, next) => {
  try {
    let { id } = req.params; 
    let { name, email, mobno, password } = req.body;

    
    let existing = await addAgent.findOne({ _id: id, userId: req.user.id });
    if (!existing) {
      return res.json({
        error: true,
        message: "Agent not found for this user",
      });
    }

    if (password) {
      password = await bcrypt.hash(password, 10);
    }

    let updatedAgent = await addAgent.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { name, email, mobno, ...(password && { password }) },
      { new: true }
    );

    return res.json({
      error: false,
      message: "Agent updated successfully",
      data: updatedAgent,
    });
  } catch (error) {
    next(error);
  }
};

let deleteAgents = async (req, res, next) => {
  try {
    let { id } = req.params;

    let deletedAgent = await addAgent.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!deletedAgent) {
      return res.json({
        error: true,
        message: "Agent not found for this user",
      });
    }

    return res.json({ error: false, message: "Agent deleted successfully" });
  } catch (error) {
    next(error);
  }
};


module.exports = { agentRegister, getAgents, updateAgents, deleteAgents };
