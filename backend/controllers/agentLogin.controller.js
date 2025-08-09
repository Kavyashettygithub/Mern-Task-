const addAgent = require("../model/addagent.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Agent Login
const agentLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ error: true, message: "Please fill all fields" });
    }

    const agent = await addAgent.findOne({ email });
    if (!agent) {
      return res.json({ error: true, message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, agent.password);
    if (!match) {
      return res.json({ error: true, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: agent._id, email: agent.email, type: "agent" },
      process.env.JWT_SECRET || "yoursecretkey",
      { expiresIn: "1h" }
    );

    return res.json({
      error: false,
      message: "Agent login successful",
      token,
      agent: { id: agent._id, name: agent.name, email: agent.email }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { agentLogin };
