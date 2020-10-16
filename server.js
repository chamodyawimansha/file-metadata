var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
require("dotenv").config();

var app = express();

const port = process.env.PORT;
app.use(cors());

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

app.post("/api/fileanalyse", (res, req) => {});

app.listen(port, () => {
  console.log("Node.js listening on port " + port);
});
