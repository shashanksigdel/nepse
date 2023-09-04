const express = require("express")
const { liveMarket } = require("../controller/nepseController.js")
const route = express.Router()

route.get("/", (req, res) => {
  res.send("Welcome to API")
})
route.get("/live", liveMarket)
module.exports = route
