const mongoose = require('mongoose');
const passport = require('passport');
module.exports = function () {
    const User = mongoose.model('User');
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findOne({
            _id: id
        }, '-password -salt', (err, user) => {
            done(err, user);
        })
    });
    require('../../config/strategies/local')(passport);
    return passport;

};