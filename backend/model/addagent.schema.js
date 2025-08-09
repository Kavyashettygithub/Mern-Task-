const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "login", // main user model
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobno: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AddAgent", agentSchema);
