const User = require("../models/user-models");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userCltr = {};

userCltr.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const body = req.body;
  const salt = await bcryptjs.genSalt();
  const hashpassword = bcryptjs.hash(body.password, salt);
  const user = new User({
    username: body.username,
    email: body.email,
    password: body.password,
  });
  await user.save;
  return res.status(200).json(user);
};

userCltr.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const body = req.body;

  try {
    const user = await User.findOne({ email: body.email });
    if (user) {
      const isAuth = await bcryptjs.compare(body.password, user.password);
      if (isAuth) {
        const tokendata = {
          id: user._id,
          role: user.role,
        };
        const token = JsonWebTokenError.sign(
          tokendata,
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );
        return res.send({ token: token });
      }
      res.status(404).json({ errors: "Invalid email/password" });
    }
    res.status(404).json({ errors: "Invlid email/password" });
  } catch (err) {
    res.status(500).json({ errors: "internal server errors" });
  }
};
module.exports = userCltr;
