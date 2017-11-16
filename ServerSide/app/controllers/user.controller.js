const User = require('mongoose').model('User');

exports.create = function(req,res,next){
    const user = new User(req.body);
    user.save((err)=>{
        if(err){
        return res.status(500).send(err);
        }
        else{
            res.status(200).send(user);
        }
    });
}

exports.getAllUsers = function(req,res,next){
    User.find({},(err,users)=>{
        if(err){
        return res.status(500).send(err);
        }
        else{
            res.status(200).send(users);
        }
    });
}

