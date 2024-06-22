const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const routes = require("./controllers");
const sequelize = require("./config/connection");

const app = express()
app.use(routes);

app.get("/", (req, res) => {
    res.status(200).send("Hello World!")
})

const port = process.env.PORT ?? 3001
app.listen(port, () => {
    console.log(`Now listening at http://localhost:${port}`)
})