const User = require("../models/user.schema")

exports.home = ("/", (req, res) => {
    res.send("Hello from node")
})