// Description: This file is the entry point for the application. It sets up the server and the port, and syncs the database
const PORT = process.env.PORT || 3001;
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./routes');
const sequelize = require('./config/connection');

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const hbs = exphbs.create({});

// Create the server
const app = express();

// Middleware
const sess = {
    secret: 'Super secret secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict'
    },
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// Handlebars
const handlebars = require('handlebars');

handlebars.registerHelper('eq', function(arg1, arg2, options) {
    if (arg1 === arg2) {
        return options.fn ? options.fn(this) : '';
    } else {
        return options.inverse ? options.inverse(this) : '';
    }
});

handlebars.registerHelper('format_date', (date) => {
    return date.toLocaleDateString();
});

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

// Sync database, then start server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening at http://127.0.0.1:${PORT}`));
});