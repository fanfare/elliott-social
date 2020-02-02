"use strict";

const router = require("express").Router();
const User = require("../models/user");
const userRoutes = require("./user.js");


/* show home page */
router.get("/", async function(req, res) {
    User.aggregate([{$sample: {size: 200}}], async function(err, allUsers) {
        if (err) {
            console.log(err);
        } else {
            if(req.isAuthenticated()){
                User.findOne({username: res.locals.currentUser.username}, 'user').then(function(data){
                    var friendsArray = data.user.friends.map(function(friend) { 
                      return User.findOne({_id: friend.friend_id }).exec() 
                    });
                    return Promise.all(friendsArray);
                }).then(function(friendsList){
                    res.render("index", { page: req.url, users: allUsers, friends: friendsList });
                    console.log(friendsList);
                }).catch(function(err) {
                    throw err;
                })
            } else { 
                res.render("index", { page: req.url, users: allUsers });
            }
        }
    });
});

// INCLUDE USER ROUTES from user.js file
router.use("/", userRoutes);

// Sort tweets array by date (Latest First)
function latestTweetsByDate(allTweets){
    allTweets.sort(function(a, b) { return (a.date < b.date) ? 1 : ((a.date > b.date) ? -1 : 0); });
    return allTweets;
}

// Sort tweets array by date (Oldest First)
function oldestTweetsByDate(allTweets){
    allTweets.sort(function(a, b){ return (a.date < b.date) ? -1 : ((a.date > b.date) ? 1 : 0); });
    return allTweets;
}

// Check if loggedin MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
} 

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;