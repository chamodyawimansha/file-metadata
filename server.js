var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
require("dotenv").config();
const fileUpload = require("express-fileupload");

var app = express();

const port = process.env.PORT || 3000;
app.use(cors());
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", (req, res) => {
  try {
    if (!req.files) {
      return res.json({
        error: "No file uploaded",
      });
    } else {
      let file = req.files.file;

      return res.json({
        name: file.name,
        type: file.mimetype,
        size: file.size,
      });
    }
  } catch (err) {
    return res.json({ error: "server error" });
  }
});

app.listen(port, () => {
  console.log("Node.js listening on port " + port);
});
