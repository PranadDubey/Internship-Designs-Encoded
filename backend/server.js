const express = require("express")
const mysql = require("mysql")
const cors = require("cors")
const dotenv = require("dotenv")

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())
dotenv.config()

const superAdminRoutes = require("./routers/superAdmin.routes")

app.use("/superAdmin/auth", superAdminRoutes)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
