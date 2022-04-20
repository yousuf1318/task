const express = require("express");
const router = require("../router/index");
const morgan = require("morgan");

const cors = require("cors");
const bodyParser = require("body-parser");

const { logs } = require("./vars");

const app = express();

app.use(morgan(logs));

app.use(cors());



app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(router);


module.exports = app;
