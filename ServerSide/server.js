const express = require('./app/controllers/express');
const mongoose = require('./app/controllers/mongoose');
const config = require('./config/development');
const passportConfigure = require('./app/controllers/passport')
mongoose();
const passport = passportConfigure();
const app = express(passport);
app.listen(config.PORT);
console.log(`Server Listening on port:${config.PORT}`);

