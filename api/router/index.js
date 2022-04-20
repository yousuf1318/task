const router = require("express").Router();
const express = require("express");



router.use("/register", require("./register"));
router.use("/login", require("./login"));
router.use("/PL", require("./profit&loss"));

module.exports = router;