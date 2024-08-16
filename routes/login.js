const User = require("../models/User")

const router = require("express").Router()

router.get("/", (req, res) => {
    if (req.session.user) {
        res.redirect("/")
        return
    }
    
    res.render("login")
})

router.post("/", async function(req, res) {

    console.log("session user:", req.session.user)

    const user = await User.findOne({
        where: {
            username: req.body.username
        }
    })

    if (!user) {
        res.redirect(`/login?error=${encodeURIComponent("Could not find user with that username")}`)
        return
    }

    const passwordValid = await user.checkPassword(req.body.password)

    if (!passwordValid) {
        res.redirect(`/login?error=${encodeURIComponent("Incorrect password")}`)
        return
    }

    req.session.user = user
    req.session.save()
    
    res.redirect("/")
})

module.exports = router