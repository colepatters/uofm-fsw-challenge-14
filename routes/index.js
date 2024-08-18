const loginRouter = require('./login')
const registerRouter = require("./register")
const dashboardRouter = require("./dashboard")
const postsRouter = require("./post")

const apiRouter = require("./api")
const { BlogPost, User } = require('../models')
const { getPosts } = require('../controllers/postController')

const router = require("express").Router()

router.get("/", async function(req, res) {
    const posts = await getPosts()

    res.render("index", { user: req.session.user, posts })
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
router.use("/posts", postsRouter)

router.use("/api", apiRouter)

module.exports = router