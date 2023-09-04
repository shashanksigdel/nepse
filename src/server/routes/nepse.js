const express = require("express")
const { liveMarket } = require("../controller/nepseController.js")
const router = express.Router()

router.get("/welcome", (req, res) => {
  res.send("Welcome to API")
})
route.get("/live", liveMarket)
module.exports = router
