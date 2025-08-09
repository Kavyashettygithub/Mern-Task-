const mongoose = require("mongoose");

const uploadCsvSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "login", 
      required: true,
    },
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AddAgent", 
      required: true,
    },
    items: [
      {
        firstName: { type: String },
        phone: { type: String },
        notes: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("uploadCsv", uploadCsvSchema);
