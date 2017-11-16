const users = require('../controllers/user.controller');
module.exports = function(app){
    app.route('/users').post(users.create).get(users.getAllUsers);
};