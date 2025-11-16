const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const runHandler = require("./handlers/runHandlers.js");

const app = express();
app.use(express.json());
app.use(cors());

// Datasets directory
const datasetsDir = path.join(__dirname, "../../datasets");
// GET /files → list dataset files
app.get("/files", (req, res) => {
  const classes = ["closest_pair", "integer_mul"];
  const out = {};

  for (const c of classes) {
    const dir = path.join(datasetsDir, c);

    if (!fs.existsSync(dir)) {
      out[c] = [];
      continue;
    }

    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".txt"));
    out[c] = files;
  }

  res.json(out);
});
// POST /run → run selected dataset with correct algorithm
app.post("/run", async (req, res) => {
  try {
    const { type, filename } = req.body;

    if (!type || !filename) {
      return res.status(400).json({ error: "type and filename required" });
    }

    const result = await runHandler(type, filename);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error", details: err.message });
  }
});
// START SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
