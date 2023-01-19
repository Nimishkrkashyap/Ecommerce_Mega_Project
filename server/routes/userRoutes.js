const express = require("express");
const { home } = require("../controllers/userController");
const Router = express.Router();

Router.get("/", home)

module.exports = Router