const express = require("express");
const app = express();
const expressLayout = require("express-ejs-layouts");

const dotEnv = require("dotenv");
dotEnv.config();
let port = process.env.APP_PORT || 3000;

// Ejs Midlleware
app.use(expressLayout);
app.set("view engine", "ejs");

// Route Variable
const home = require("./app/routes/index");
const users = require("./app/routes/users");

// Route List
app.use("/", home);
app.use("/users", users);

app.listen(port, function (req, res) {
  console.log(`Server is running on : http://localhost:${port}`);
});
