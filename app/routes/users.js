const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

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
  } else {
    User.findOne({ email: email })
      .then((user) => {
        if (user) {
          // User Exist
          errors.push({ message: "email has aleready taken" });
          res.render("register", { errors, name, email, password, vpassword });
        } else {
          const newUser = new User({
            name,
            email,
            password,
          });
          // Hash password
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then((user) => {
                  req.flash("success_msg", "You are registered");
                  res.redirect("/users/login");
                })
                .catch((err) => {
                  console.log(err);
                });
            })
          );
        }
      })
      .catch((err) => {});
  }
});
module.exports = router;
