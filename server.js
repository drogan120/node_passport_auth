const express = require("express");
const app = express();
const expressLayout = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");

const dotEnv = require("dotenv");
dotEnv.config();
let port = process.env.APP_PORT || 3000;

// DB Config
const db = require("./config/mongoose");

// Mongo db
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log(`mongo db connected on ${db}`);
  })
  .catch((err) => {
    console.log("====================================");
    console.log(err);
    console.log("====================================");
  });

// Ejs Midlleware
app.use(expressLayout);
app.set("view engine", "ejs");

// Bodyparser 7 cookie parser
app.use(express.urlencoded({ extended: false }));

// Express session
let MemoryStore = session.MemoryStore;
app.use(
  session({
    secret: "secret",
    resave: true,
    store: new MemoryStore(),
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
// Connect flash
app.use(flash());

// Global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

// Route Variable
const home = require("./app/routes/index");
const users = require("./app/routes/users");

// Route List
app.use("/", home);
app.use("/users", users);

app.listen(port, function (req, res) {
  console.log(`Server is running on : http://localhost:${port}`);
});
