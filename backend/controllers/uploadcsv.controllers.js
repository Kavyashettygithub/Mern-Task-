let multer = require("multer");
let path = require("path");
let fs = require("fs");
let csv = require("csv-parser");
let xlsx = require("xlsx");
let uploadCsv = require("../model/uploadcsv.schema");
let addAgent = require("../model/addagent.schema");

// configure multer
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({
  storage,
  fileFilter: (_, file, cb) => {
    const ext = path.extname(file.originalname);
    if (![".csv", ".xlsx", ".xls"].includes(ext)) {
      return cb(new Error("only .csv, .xlsx, .xls files allowed"));
    }
    cb(null, true);
  },
}).single("file");

// upload 
const uploadFile = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) return res.json({ error: true, message: err.message });
    if (!req.file)
      return res.json({ error: true, message: "No file uploaded" });

    const ext = path.extname(req.file.originalname);
    let data = [];

    try {
      if (ext === ".csv") {
        fs.createReadStream(req.file.path)
          .pipe(csv())
          .on("data", (row) => {
            data.push({
              firstName: row.FirstName || row.firstname || "",
              phone: row.Phone || row.phone || "",
              notes: row.Notes || row.notes || "",
            });
          })
          .on("end", async () => {
            await distributeAndSave(data, req.user.id);
            fs.unlinkSync(req.file.path);
            return res.json({
              error: false,
              message: "CSV processed and distributed",
            });
          });
      } else {
        const workbook = xlsx.readFile(req.file.path);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        data = xlsx.utils.sheet_to_json(sheet);
        await distributeAndSave(data, req.user.id);
        fs.unlinkSync(req.file.path);
        return res.json({
          error: false,
          message: "Excel processed and distributed",
        });
      }
    } catch (error) {
      next(error);
    }
  });
};

// distribution logic

async function distributeAndSave(data, userId) {
  const agents = await addAgent.find({ userId });

  if (!agents || agents.length === 0) {
    return { success: false, message: "No agents found. Please register agents first." };
  }

  const chunkSize = Math.floor(data.length / agents.length);
  const remainder = data.length % agents.length;

  await uploadCsv.deleteMany({ userId });

  for (let i = 0; i < agents.length; i++) {
    const start = i * chunkSize + Math.min(i, remainder);
    const end = start + chunkSize + (i < remainder ? 1 : 0);

    await uploadCsv.create({
      userId,
      agentId: agents[i]._id,
      items: data.slice(start, end),
    });
  }

  return { success: true };
}


// get distributed lists for logged-in user
const getDistributedLists = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: true, message: "Unauthorized: user not found" });
    }

    const lists = await uploadCsv
      .find({ userId: req.user.id })
      .populate("agentId", "name email") 
      .lean();

    if (!lists.length) {
      return res.json({ error: false, data: [], message: "No distributed lists found" });
    }

    return res.json({ error: false, data: lists });
  } catch (error) {
    console.error("Error fetching distributed lists:", error);
    return res.status(500).json({ error: true, message: "Failed to fetch lists" });
  }
};


module.exports = { getDistributedLists, uploadFile };

