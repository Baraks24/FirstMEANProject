const users = require('../controllers/user.controller');
module.exports = function(app){
    app.route('/users').post(users.create).get(users.getAllUsers);
    app.route('/signup').post(users.signup);
    app.route('/signout').get(users.signout);
    app.route('/updateUser').post(users.update);
    app.route('/login').post(users.login);
};