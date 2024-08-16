const router = require("express").Router()

router.get("/", (req, res) => {
    res.render("login")
})

router.post("/", (req, res) => {
    console.log("POST login")
    
    
})

module.exports = router