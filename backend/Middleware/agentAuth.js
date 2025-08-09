const jwt = require("jsonwebtoken");

const agentAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ error: true, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "yoursecretkey"
    );

    if (decoded.type !== "agent") {
      return res
        .status(403)
        .json({ error: true, message: "Not authorized as agent" });
    }

    req.agent = decoded; 
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: true, message: "Invalid or expired token" });
  }
};

module.exports = agentAuth;
