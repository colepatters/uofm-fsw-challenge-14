const loginRouter = require('./login')

const router = require("express").Router()

router.get("/", (req, res) => {
    res.render("index")
})

router.use("/login", loginRouter)

module.exports = router