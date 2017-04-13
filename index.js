var bodyParser = require("body-parser");
var express = require("express");

var app = express();
var _ = require("lodash");

app.use(bodyParser.json());
app.use("/login", express.static("public/login.html"));
app.use("/app", express.static("public/app.html"));

var port = 3000;
if (_.isString(process.argv[2])) {
  port = process.argv[2].split("-")[1];
}

app.listen(port, function() {
  console.log("server is listening on http://localhost:" + port);
  console.log("press CTRL + C to quit..");
  console.log("to start, type node index '-port number' (- port number is optional)");
});
