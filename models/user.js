var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    user: {
        firstname: String,
        lastname: String,
        location: String,
        website: String,
        description: String,
        // image: {type: String, default: "/images/blank-profile.png"},
        image: String,
        shape: String,
        color: {type: String},
        songs: {
            song1: String,
            song2: String,
            song3: String,
            song4: String,
            song5: String,
            song6: String,
            song7: String,
            song8: String,
        },
        books: {
            book1: String,
            book2: String,
            book3: String,
            book4: String,
            book5: String,
            book6: String,
            book7: String,
            book8: String,
        },
        films: {
            film1: String,
            film2: String,
            film3: String,
            film4: String,
            film5: String,
            film6: String,
            film7: String,
            film8: String,
        },
        links: {
            link1: String,
            link2: String,
            link3: String,
            link4: String,
            link5: String,
            link6: String,
            link7: String,
            link8: String,
        },
        custom: {
            custom_title: String,
            custom1: String,
            custom2: String,
            custom3: String,
            custom4: String,
            custom5: String,
            custom6: String,
            custom7: String,
            custom8: String,
        },
        friends: [{
            friend_id: String,
        }]
    },
    email: String, 
    username: String, 
    passport: String,
    joinDate: {type: Date, default: Date.now},
});

var UserEmail = UserSchema.plugin(passportLocalMongoose, { usernameField : 'email' });

module.exports = mongoose.model("User", UserEmail);