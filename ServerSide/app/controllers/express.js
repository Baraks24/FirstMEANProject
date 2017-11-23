const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const config = require('../../config/development');
const MongoStore = require('connect-mongo')(session);
const socketio = require('socket.io');
const configureSocketio = require('./socket.io');
const cors = require('cors');

module.exports = function (passport) {
    const app = express();
    const server = require('http').Server(app);
    const io = socketio.listen(server);

    app.use(morgan('tiny'));
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        if ('OPTIONS' == req.method) {
            res.status(200).send();
        } else {
            next();
        }
    });
    //app.use(cookieParser(config.sessionSecret));
    app.use(bodyParser.json());
    const mongoStore = new MongoStore({
        url: config.mongo.db
    });
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret,
        store: mongoStore
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    require('../routes/server.routes')(app);
    require('../routes/users.routes')(app);
    
    configureSocketio(server, io, mongoStore, passport);
    
    return server;
}