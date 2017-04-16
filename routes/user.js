"use strict";

const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user.js");

router.use(require("body-parser").urlencoded({ extended: true }));

// SHOW /register - Show new user signup form
router.get("/register", function(req, res){
    res.render("user/signup");
});

// CREATE /signup - Create new user, Log user in, then redirect
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username, email: req.body.email});
    User.register(newUser, req.body.password, function(err){
        if(err){
            console.log(err);
            return res.render("user/signup");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/tweets");
        });
    });
});

// LOGIN SHOW PAGE
router.get("/login", function(req, res){
    res.render("user/login");
});

// LOGIN-> POST ROUTE AUTHENTICATION
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/tweets",
        failureRedirect: "/login"
    }), function(){
    }
);

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

// SHOW PROFILE PAGE
router.get("/profile", isLoggedIn, function(req, res){
    res.render("user/profile.ejs");
});


// Check if loggedin MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;