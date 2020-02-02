"use strict";

const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user.js");
const {check, validationResult} = require('express-validator');

router.use(require("body-parser").urlencoded({ extended: true }));

// SHOW /register - Show new user signup form
router.get("/register", function(req, res){
    res.render("user/signup", { page: req.url });
});

// CREATE /signup - Create new user, Log user in, then redirect
router.post("/register", [
    check('email').not().isEmpty().isLength({ max: 1000 }).escape(),
    check('username').not().isEmpty().isLength({ min: 3, max: 15 }).escape().custom(value => !/\s/.test(value)).withMessage('No spaces are allowed in the username'),
    check('password').not().isEmpty().isLength({ min: 5, max: 40 }).escape().withMessage('Password must be at least 5 characters'),
    check('location').not().isEmpty().isLength({ max: 100 }),
    check('color').not().isEmpty().isLength({ max: 100 })
], function(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.render("user/signup", { page: req.url, errors: errors.array() });
    } else {
        User.findOne({username: req.body.username.toLowerCase()}).then(function(err, userData){
            if (!err) {
                var newUser = new User(
                    {
                        user: {
                            location: req.body.location,
                            color: req.body.color,
                            description: ""
                        },
                        username: req.body.username.toLowerCase(),
                        email: req.body.email
                    });
            
                User.register(newUser, req.body.password, function(err){
                    if(err){
                        console.log('here:', err);
                        return res.render("user/signup", { page: req.url });
                    }
                    passport.authenticate("local")(req, res, function(){
                        req.flash('message', 'welcome home');
                        res.redirect("/");
                    });
                });
            } else {
                console.log('user already exists')
                req.flash('message', 'user already exists');
                return res.render("user/signup", { page: req.url });
            }
        })
    }
    
});

// LOGIN SHOW PAGE
router.get("/login", function(req, res){
    // req.flash('error');
    // console.log(req.flash('error'))
    res.render("user/login", { page: req.url, messages: {message: req.flash('error')} });
});

// LOGIN-> POST ROUTE AUTHENTICATION
router.post("/login", passport.authenticate("local", { successRedirect: "/", failureRedirect: "/login", failureFlash: true }), function(){
});

// LOGOUT ROUTE
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

// /username PROFILE ROUTE
router.get("/:username", async function(req, res) {
    try {
        User.findOne({username: req.params.username}).then(function(userData){
            // console.log('friends', userData)
            var friendsArray = userData.user.friends.map(function(friend) {
                return User.findOne({_id: friend.friend_id }).exec()
            })
            Promise.all(friendsArray).then(function(friendsPromise) {
                // console.log(friendsPromise)
                // console.log(userData)
                res.render("user/profile.ejs", { page: req.url, profile: userData, friends: friendsPromise});
            }).catch(function(err) {
                console.log(err);
            });
        }).catch(function(err) {
            console.log('user route:', err.message);
        });
    } catch (err) {
        console.log(err.message);
    }
});

// Add friend
router.put("/:username/friend", function(req, res){
    // res.redirect("/" + req.params.username)
        User.findOne({username: req.params.username}, function(err, userFound) {
            if (err) {
                console.log(err)
            } else {
                var friendID = userFound._id
                var friendObj = {"friend_id": friendID}

                // Check if more than 4 friends
                if (res.locals.currentUser.user.friends.length <= 8) {
                    // Check if friend already exists in friend list
                    if (res.locals.currentUser.user.friends.some(friend => friend.friend_id == userFound._id)) {
                        console.log('already added to favorites')
                        req.flash('message', 'already added to bookmarks');
                        return res.redirect("/" + req.params.username)
                    } else {
                        console.log('added friend')
                        User.findOneAndUpdate({ username: res.locals.currentUser.username }, {$push: {'user.friends': friendObj}}, function(err, doc) {
                            if (err) return res.send(500, {error: err});
                            req.flash('message', 'added to bookmarks');
                            return res.redirect("/" + req.params.username)
                        })
                    }
                } else {
                    console.log('too many friends')
                    req.flash('message', 'you can only add 9 bookmarks');
                    return res.redirect("/" + req.params.username)
                }

                
            }
        })
})

// Delete Friend
router.delete("/:username/remove-friend/:id", isLoggedIn, function(req, res) {
    User.findOne({username: req.params.username}, function(err, userFound) {
        if(!err) {
            console.log(userFound)
            
            var friendID = req.params.id
            var friendObj = {"friend_id": friendID}

            console.log(friendObj)

            User.findOneAndUpdate({ username: req.params.username }, {$pull: {'user.friends': friendObj}}, function(err, doc) {
                if (err) return res.send(500, {error: err});
                req.flash('message', 'removed from favorites');
                return res.redirect("/" + req.params.username)
            })

        }
    })
});

// UPDATE route for user
router.put("/:username", isLoggedIn, [
    check('username').not().isEmpty().isLength({ min: 3, max: 15 }).escape().custom(value => !/\s/.test(value)).withMessage('No spaces are allowed in the username'),
    check('location').isLength({ max: 100 }),
    check('website').isLength({ max: 100 }),
    check('color').not().isEmpty().isLength({ max: 100 }),
    check('shape').isLength({ max: 100 }),
    check('description').isLength({ max: 10000 })
], function(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        res.redirect("/" + req.params.username);
    } else {
        if(res.locals.currentUser.username == req.params.username){
            // Current Logged In user is the same as the profile being edited
            User.findOne({username: req.params.username}, function(err, profile){
                if(err){
                    console.log(err);
                    res.redirect("/" + req.body.username);
                } else {
                    profile.username = req.body.username.toLowerCase();
                    profile.user.description = req.body.description;
                    profile.user.location = req.body.location;
                    profile.user.website = req.body.website;
                    profile.user.shape = req.body.shape;
                    profile.user.color = req.body.color;
                    profile.user.songs = {
                        song1: req.body.song1,
                        song2: req.body.song2,
                        song3: req.body.song3,
                        song4: req.body.song4,
                        song5: req.body.song5,
                        song6: req.body.song6,
                        song7: req.body.song7,
                        song8: req.body.song8
                    };
                    profile.user.books = {
                        book1: req.body.book1,
                        book2: req.body.book2,
                        book3: req.body.book3,
                        book4: req.body.book4,
                        book5: req.body.book5,
                        book6: req.body.book6,
                        book7: req.body.book7,
                        book8: req.body.book8
                    };
                    profile.user.films = {
                        film1: req.body.film1,
                        film2: req.body.film2,
                        film3: req.body.film3,
                        film4: req.body.film4,
                        film5: req.body.film5,
                        film6: req.body.film6,
                        film7: req.body.film7,
                        film8: req.body.film8
                    };
                    profile.user.links = {
                        link1: req.body.link1,
                        link2: req.body.link2,
                        link3: req.body.link3,
                        link4: req.body.link4,
                        link5: req.body.link5,
                        link6: req.body.link6,
                        link7: req.body.link7,
                        link8: req.body.link8
                    };
                    profile.user.custom = {
                        custom_title: req.body.custom_title,
                        custom1: req.body.custom1,
                        custom2: req.body.custom2,
                        custom3: req.body.custom3,
                        custom4: req.body.custom4,
                        custom5: req.body.custom5,
                        custom6: req.body.custom6,
                        custom7: req.body.custom7,
                        custom8: req.body.custom8
                    };


                    // Check if username changed
                    if (req.params.username != req.body.username.toLowerCase()) {
                        // Check if username already exists
                        User.findOne({username: req.body.username.toLowerCase()}, function(err, found){
                            if (found == null) {
                                profile.save(function(err){
                                    if(err){
                                        // Couldn't save the profile
                                        console.log(err);
                                        req.flash('message', 'Couldn\'t save');
                                        res.redirect("/" + req.body.username.toLowerCase());
                                    } else {
                                        // Profile Updated & Saved successfully
                                        req.flash('message', 'Saved');
                                        res.redirect("/" + req.body.username.toLowerCase());
                                        console.log('elliott', req.body.song1)
                                    }
                                });
                            } else {
                                req.flash('message', 'username taken');
                                res.redirect("/" + req.params.username);
                            }
                        })
                    } else {
                        profile.save(function(err){
                            if(err){
                                // Couldn't save the profile
                                console.log(err);
                                req.flash('message', 'Couldn\'t save');
                                res.redirect("/" + req.body.username.toLowerCase());
                            } else {
                                // Profile Updated & Saved successfully
                                req.flash('message', 'Saved');
                                res.redirect("/" + req.body.username.toLowerCase());
                                console.log('elliott', req.body.song1)
                            }
                        });
                    }
                }
            });
        } else {
            // Current Logged in user is not the same as the profile being edited
            // Add better error handling later
            console.log("ERROR: Current logged in user is NOT the same as the profile being edited!");
            res.redirect("/" + req.params.username);
        }
    }
});

// Translate Birthday date into readable birthday
function readableDate(date){
    var myDate = new Date(date);
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
        "October", "November", "December"][myDate.getMonth()];
    var usersDate = month + " " + (myDate.getDate()+1) + ", " + myDate.getFullYear();
    return usersDate;
}


// Check if loggedin MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect({error: 'Please login to continue.'}, "/login");
} 

module.exports = router;