const { BlogPost } = require("../models")

const router = require("express").Router()

router.get("/", async function(req, res) {
    const userPosts = await BlogPost.findAll({
        where: {
            author: req.session.user.id
        }
    })

    res.render("dashboard")
})

module.exports = router