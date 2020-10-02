const express = require("express");
const router = express.Router();

router.get("/login", function (req, res) {
  res.render("login");
});

router.get("/register", function (req, res) {
  res.render("register");
});

router.post("/register", function (req, res) {
  const { name, email, password, vpassword } = req.body;
  let errors = [];

  if (!name || !email || !password || !vpassword) {
    errors.push({ message: "please fill in all fields" });
  }

  if (password !== vpassword) {
    errors.push({ message: "password doesnt match" });
  }

  if (password.length < 6) {
    errors.push({ message: "password should be at least 6 chars" });
  }

  if (errors.length > 0) {
    res.render("register", { errors, name, email, password, vpassword });
    console.log('====================================');
    console.log(errors);
    console.log('====================================');
  } else {
    res.send("pass");
  }
});
module.exports = router;
