const loginRouter = require('./login')
const registerRouter = require("./register")
const dashboardRouter = require("./dashboard")

const apiRouter = require("./api")
const { BlogPost, User } = require('../models')

const router = require("express").Router()

router.get("/", async function(req, res) {
    const posts = (await BlogPost.findAll({
        include: {
            model: User,
            attributes: {
                exclude: ['password']
            }
        },
    })).map(entry => {
        return {
            ...entry.dataValues,
            author: entry.dataValues.user.dataValues
        }
    })

    res.render("index", { user: req.session.user, posts: posts.reverse() })
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