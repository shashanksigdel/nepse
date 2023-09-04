const express = require("express")
const serverless = require("serverless-http")

const app = express()
const router = express.router()
route.use(express.json()) // Middleware to parse JSON data

router.get("/", (req, res) => {
  res.json({
    firstname: "Shashank",
  })
})

app.use(".netlify/functions/api", router)
// app.use(".netlify/functions/api", require("./server/routes/nepse"))

module.exports.handler = serverless(app)
