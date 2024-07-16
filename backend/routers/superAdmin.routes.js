const express = require("express")
const router = require("express").Router()
const app = express()
const SuperAdmin = require("../models/superAdmin.class")
const otps = require("../models/otps.Class")
const jwt = require("jsonwebtoken")
const { v4: uuidv4 } = require("uuid")
const { jwtToken } = process.env
// let otp

router.post("/login", async (req, res) => {
  const { email, password } = req.body

  console.log("superAdmin request received!", email, password)

  const where = [["email", "=", `'${email}'`]]
  const select = "id, name,contactNumber, email, password"

  const found = await SuperAdmin.find({ select, where }).catch((e) => e)

  if (!found.success) return res.json(found)
  if (found.result.length == 0) return res.json({ success: false, error: "Invalid email!" })
  if (found.result[0].password != password) return res.json({ success: false, error: "Invalid Password!" })
  const { password: pass, status, ...superAdmin } = found.result[0]
  const token = jwt.sign(superAdmin, jwtToken, {
    expiresIn: "1h",
  })

  res
    .cookie("access_token", token, {
      httpOnly: true,
    })
    .status(200)
    .json(superAdmin)
})

// router.post("/forgot-password", async (req, res) => {
//   const { email } = req.body

//   console.log("superAdmin request recieved!", email)

//   const where = [["email", "=", `'${email}'`]]
//   const select = "id,email, password"

//   const found = await SuperAdmin.find({ select, where }).catch((e) => e)

//   if (!found.success) return res.json(found)
//   if (found.result.length == 0) return res.json({ success: false, error: "Email ID doesn't exist!" })
//   const { status, ...superAdmin } = found.result[0]
//   otp = uuidv4()
//   const token = jwt.sign(superAdmin, otp, {
//     expiresIn: "15m",
//   })
//   const link = `http://localhost:3000/superAdmin/auth/forgot-password/${otp}`
//   console.log("Link : ", link)
//   res.json({ status, otp, superAdmin })
// })

// router.put("/reset-password", async (req, res) => {
//   const { otp, newPassword } = req.body
//   if (!otp) {
//     return res.status(400).json({ success: false, error: "OTP is required!" })
//   }
//   console.log("superAdmin reset-password request recieved", otp)
//   let superAdmin
//   try {
//     superAdmin = jwt.verify(otp, jwtToken)
//   } catch (err) {
//     return res.status(400).json({ success: false, error: "Invalid or expired OTP!" })
//   }
//   const { email } = superAdmin

//   const where = [["email", "=", `'${email}'`]]
//   const updated = await SuperAdmin.save({ newPassword, where }).catch((e) => e)
//   console.log("Reset Successful", updated)
//   res.json(updated)
// })

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body

  console.log("superAdmin request received!", email)

  const otp = Math.floor(10000 + Math.random() * 90000).toString()
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000)
  const data = { email, otp, expiresAt }

  const updated = await otps.save({ data }).catch((e) => e)
  console.log("updated!", updated)
  res.json({ updated, otp, expiresAt })
})

router.put("/reset-password", async (req, res) => {
  const { otp, password } = req.body
  const data = { password }
  if (!otp) {
    return res.status(400).json({ success: false, error: "OTP is required!" })
  }
  console.log("superAdmin reset-password request received", otp)
  let where = [["otp", "=", `${otp}`]]
  const select = "id, email"
  const found = await otps.find({ select, where }).catch((e) => e)
  if (!found.success) return res.json(found)
  if (found.result.length == 0) return res.json({ success: false, error: "Invalid OTP!" })
  const { email, status, ...other } = found.result[0]
  where = [["email", "=", `'${email}'`]]
  console.log("New password is : ", data)
  const updated = await SuperAdmin.save({ data, where }).catch((e) => e)
  console.log("updated!", updated)
  res.json(updated)
})

router.put("/:id", async (req, res) => {
  const data = req.body
  const { id } = req.params
  console.log("update superAdmin request recieved!!", id)
  const where = [["id", "=", `'${id}'`]]
  const updated = await SuperAdmin.save({ data, where }).catch((e) => e)
  console.log("updated!", updated)
  res.json(updated)
})

module.exports = router
