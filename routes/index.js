const loginRouter = require('./login')
const registerRouter = require("./register")
const dashboardRouter = require("./dashboard")

const apiRouter = require("./api")

const router = require("express").Router()

router.get("/", (req, res) => {
    console.log(req.session.user)
    res.render("index", { user: req.session.user })
})

router.get("/logout", function(req, res) {
    if (!req.session.user) {
        res.redirect("/")
        return
    }

    req.session.destroy()

    res.redirect("/")
})

router.use("/register", registerRouter)
router.use("/login", loginRouter)
router.use("/dashboard", dashboardRouter)

router.use("/api", apiRouter)

module.exports = router