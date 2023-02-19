const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

const { urlDb } = require('../config')

mongoose.connect(urlDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
});

const db = mongoose.connection


module.exports = db