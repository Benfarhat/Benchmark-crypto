const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CryptoJS = require('crypto-js')


// Create Schema
const correspondanceSchema = new Schema({
    identity:{
        type: String,
        unique: true
    },
    hash: String
})

// Pre save 
correspondanceSchema.pre('save', function(next) {
    const crypto = this
    crypto.hash = CryptoJS.SHA256(crypto.hash).toString(CryptoJS.enc.hex).toUpperCase()
    next()
  });

// Create model
module.exports = mongoose.model('Correspondance', correspondanceSchema) 