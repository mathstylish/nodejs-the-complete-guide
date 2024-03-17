const express = require("express")

const path = require("./helpers/path.js")

const adminRoutes = require("./routes/admin.route.js")
const shopRoutes = require("./routes/shop.route.js")
const errorController = require("./controllers/error.controller.js")
const userDev = require("./middlewares/userDev")

const app = express()

app.set("view engine", "ejs")
app.set("views", path.pathTo("views"))

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.pathTo("public")))

app.use(userDev) // user to work in development

app.use("/admin", adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

module.exports = app
