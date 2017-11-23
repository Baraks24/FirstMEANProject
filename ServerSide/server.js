const express = require('./app/controllers/express');
const mongoose = require('./app/controllers/mongoose');
const config = require('./config/development');
const passportConfigure = require('./app/controllers/passport')
const db = mongoose();
const passport = passportConfigure();
const server = express(passport);
server.listen(config.PORT);
console.log(`Server Listening on port:${config.PORT}`);

