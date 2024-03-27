import express from "express"

import path from "node:path"

import adminRoutes from "./routes/admin.route.js"
import shopRoutes from "./routes/shop.route.js"
import userRoutes from "./routes/user.route.js"
import userDev from "./middlewares/userDev.js"
import resourceNotFound from "./middlewares/resourceNotFound.js"

const app = express()

app.set("view engine", "ejs")
app.set("views", path.join(import.meta.dirname, "views"))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(import.meta.dirname, "public")))

app.use(userDev) // user to work in development

app.use("/admin", adminRoutes)
app.use(shopRoutes)
app.use(userRoutes)

app.use(resourceNotFound)

export default app
