const router = require('express').Router()

router.get("/", (req, res) => {
    res.status(200).send("Hello API Routes!")
})

module.exports = router