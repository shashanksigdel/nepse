const express = require("express")
const app = express()
app.use(express.json()) // Middleware to parse JSON data

const morgan = require("morgan")
app.use(morgan("tiny"))

const dotenv = require("dotenv").config({ path: "./config.env" })
const PORT = process.env.PORT || 8080

app.use("/", require("./server/routes/nepse"))

app.listen(PORT, () => {
  console.log(`Starting server on port http://localhost:${PORT}`)
})
