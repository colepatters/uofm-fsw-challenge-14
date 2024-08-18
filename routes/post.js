const { getPost } = require("../controllers/postController")
const { BlogPost, User, Comment } = require("../models")

const router = require("express").Router()

router.get("/:postId", async function(req, res) {
    const post = await getPost(req.params.postId)

    if (!post) {
        res.sendStatus(404)
        return
    }

    res.render("postPage", { ...post, user: req.session.user })
})

router.post("/:postId", async function(req, res) {
    const comment = await Comment.create({
        content: req.body.content,
        user_id: req.session.user.id,
        blogpost_id: req.params.postId
    })

    res.redirect("/posts/" + req.params.postId)
})

module.exports = router