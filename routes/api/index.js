const postsRouter = require("./posts")

const router = require("express").Router()

router.use("/posts", postsRouter)

module.exports = router