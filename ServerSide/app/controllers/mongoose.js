const config = require('../../config/development');
const mongoose = require('mongoose');
module.exports = function(){
    mongoose.Promise = global.Promise;    
    const db = mongoose.connect(config.mongo.db,{ useMongoClient: true });
    require('../models/user');
    return db;
};