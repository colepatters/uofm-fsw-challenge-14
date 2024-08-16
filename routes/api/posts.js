const { BlogPost } = require("../../models")

const router = require("express").Router()

router.get("/", async function(req, res) {
    const posts = await BlogPost.findAll()

    res.json(posts.map((post) => post.dataValues()))
})

router.post("/", async function(req, res) {
    const createdPost = await BlogPost.create({
        ...req.body,
        author: req.session.user.id
    })

    res.status(200).send()
})

module.exports = router