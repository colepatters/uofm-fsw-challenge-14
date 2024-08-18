const { BlogPost, User } = require("../models")

const router = require("express").Router()

router.get("/", async function(req, res) {
    if (!req.session.user) {
        res.redirect("/login")
        return
    }


    const userPosts = (await BlogPost.findAll({
        where: {
            author: req.session.user.id
        },
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

    res.render("dashboard", { posts: userPosts, user: req.session.user })
})

router.post("/", async function(req, res) {
    if (!req.session.user) {
        res.sendStatus(401)
        return
    }

    try {
        await BlogPost.create({
            ...req.body,
            author: req.session.user.id
        })
    } catch(error) {
        res.redirect(`/dashboard?post-error=${error.message}`)
        return
    }

    res.redirect("/dashboard")
})

module.exports = router