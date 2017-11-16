const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routes = require('../routes/server.routes');
const config = require('../../config/development');
module.exports = function () {
    const app = express();
    app.use(morgan('tiny'));
    app.use(bodyParser.json());
    routes(app);
    app.listen(config.PORT);
    console.log(`Server Listening on port:${config.PORT}`);
}