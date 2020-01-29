const express = require("express")
const LocalStrategy = require("passport-local")
const passport = require("passport")
const methodOverride = require("method-override")
const bodyParser = require("body-parser")
const flash = require('express-flash');
const routes = require("./routes")
const User = require("./models/user")
const path = require("path")
const session = require("express-session")
const MongoStore = require('connect-mongo')(session)
const mongoose = require("mongoose")
const PORT = 3003
const app = express()

/* connect to database */
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/elliott_social", {
    useMongoClient: true,
})

/* view engine setup */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/* configure the server */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method")); // Must use _method to use alternative routes such as DELETE & PUT
app.use(session({
    secret: "Secret Login Strategy",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 },
    maxAge: 3600000,
    store: new MongoStore({mongooseConnection:mongoose.connection}) 
}));

// Setup Passportjs Auth
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
    usernameField: 'email'
}, User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware to include user information
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
});

/* seed database with sample tweets */
// seedDB();

/* add our routes */
app.use("/", routes);

// setup server for localhost on port 3001
app.listen(PORT, process.env.IP || '0.0.0.0', () => {
    console.log(`connected to database, app listening on port ${PORT}`)
});