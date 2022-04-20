const router = require("express").Router();
const { error, success, ErrorResponse } = require("../services/response");
const bcrypt = require("bcrypt");
const User = require("../model/register");
const { check, validationResult } = require("express-validator");


router.post(
    "/register",
    [
      check("name", " Name is required").not().isEmpty(),
      check("email", "Please add a valid email").isEmail(),
      check("password", "please enter a password").not().isEmpty(),
      check("DOB", "Please enter your DOB ").not().isEmpty(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const {
        name,
        email,
        password,
        DOB,
      } = req.body;
  
      try {
        let user = await User.findOne({ email });
  
        if (user) {
          res.status(400).json({ errors: [{ msg: "User already exists" }] });
          console.log("User already exists");
        }
  
        user = new User({
            name,
            email,
            password,
            DOB,
        });
  
        const salt = await bcrypt.genSalt(10);
  
        user.password = await bcrypt.hash(password, salt);

  
        await user.save();
        res.send({
          name: user.name,
          email: user.email,
          password: user.password,
          DOB: user.DOB,
          id: user._id,
        });
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    }
  );



  module.exports = router;