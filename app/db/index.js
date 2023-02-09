const mongoose = require('mongoose')

const { urldb } = require('../config')

mongoose.connect(urldb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
});

const db = mongoose.connection


module.exports = db