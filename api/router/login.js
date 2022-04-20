const router = require("express").Router();
const { error, success, ErrorResponse } = require("../services/response");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../services/vars");
const User = require("../model/register");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = (await User.count({ email })) > 0;

    if (!userExists) throw ErrorResponse("Email not found.");

    const user = await User.findOne({ email });
    //   res.send(user)

    const passwordVerified = await bcrypt.compare(password, user.password);
    if (!passwordVerified) throw ErrorResponse("Password is incorrect.");

    const token = jwt.sign({ id: user._id }, config.jwt.secret);

    success(res, {
      token,
      name: user.name,
      email: user.email,
    });
  } catch (e) {
    error(res, e);
  }
});

module.exports = router;
