const router = require("express").Router();
const User = require("../models/user");
const registerValidation = require("./registerValidation");
const loginValidation = require("./loginValidation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { error } = await registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const ifEmailExist = await User.findOne({ email: req.body.email });
  if (ifEmailExist) {
    return res.status(400).send("Email already registered.");
  }

  const ifUsernameExist = await User.findOne({ username: req.body.username });
  if (ifUsernameExist) {
    return res.status(400).send("Username already registered.");
  }

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    await user.save();
    res.status(201).send("Registeration Done.");
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const registeredUser = await User.findOne({ username: req.body.username });
  if (!registeredUser) {
    return res.status(400).send("Username not registered.");
  }

  const validatePassword = await bcrypt.compare(
    req.body.password,
    registeredUser.password
  );
  if (!validatePassword) {
    return res.status(400).send("Incorrect password.");
  }

  const auth_token = jwt.sign(
    { _id: registeredUser._id },
    process.env.JWT_TOKEN_SECRET
  );
  res.header("auth_token", auth_token);
  res.status(200).send("Logged in.");
});

module.exports = router;
