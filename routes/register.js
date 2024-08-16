const User = require("../models/User")

const router = require("express").Router()

router.get("/", function(req, res) {
    if (req.session.user) {
        res.redirect("/")
        return
    } 

    res.render("register", { error: req.query.error })
})

router.post("/", async function(req, res) {
    console.log(req.body)

    try {
        const user = await User.create(req.body)
        req.session.user = user
        req.session.save()
    } catch (error) {
        res.redirect(`/register?error=${encodeURIComponent(error.message)}`)
        return
    }

    res.redirect("/")
})

module.exports = router