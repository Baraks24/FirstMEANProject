const User = require('mongoose').model('User');
const passport = require('passport');

function getErrorMessage(err) {
    let message = '';
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    }
    else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) {
                message = err.errors[errName].message;
            }
        }
        return message;
    }
};

exports.signup = function (req, res, next) {
    if (!req.user) {
        const user = new User(req.body);
        user.provider = 'local';
        user.save((err) => {
            if (err) {
                const message = getErrorMessage(err);
                res.status(500).send({ error: message });
            }
            else {
                req.login(user, (err) => {
                    if (err) {
                        res.status(500).send({ error: 'Login error' });
                    }
                    else {
                        res.status(200).send(user);
                    }
                });
            }
        });
    }
    else {
        res.status(200).send({ message: 'ok' });
    }
};

exports.signout = function (req, res, next) {
    req.logout();
    res.status(200).send({ message: 'OK' });
};


exports.login = function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            res.status(500).send(err);
        }
        else if (!user) {
            res.status(500).send({ message: "User does not exist" });
        }
        else {
            req.logIn(user, function (err) {
                if (err) {
                    res.status(500).send({ message: "Login error" });
                }
                else {
                    res.status(200).send(user);
                }
            });
        }
    })(req, res, next);
};

exports.create = function (req, res, next) {
    const user = new User(req.body);
    user.save((err) => {
        if (err) {
            return res.status(500).send(err);
        }
        else {
            res.status(200).send(user);
        }
    });
}

exports.update = function (req, res, next) {
    User.update({'_id':req.user._id},{$set:req.body},(err,user) => {
        if (err) {
            return res.status(500).send(err);
        }
        else {
            res.status(200).send({message:'OK'});
        }
    });
}

exports.getAllUsers = function (req, res, next) {
    User.find({}, (err, users) => {
        if (err) {
            return res.status(500).send(err);
        }
        else {
            res.status(200).send(users);
        }
    });
}

