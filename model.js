const mongoose = require('mongoose')
const Schema = mongoose.Schema
const leftpad = require('leftpad')
const CryptoJS = require('crypto-js')


// Create Schema
const cryptoSchema = new Schema({
    id : {
        type: Number,
        unique: true
    },
    identity:{
        type: String,
        unique: true
    },
    hash: String
})

cryptoSchema.pre('save', function(next) {
    const crypto = this
    let word = leftpad(crypto.id, 8)
    crypto.hash = CryptoJS.SHA256(word).toString(CryptoJS.enc.hex).toUpperCase()
    crypto.identity = word
    next()
  });

// Create model
module.exports = mongoose.model('Crypto', cryptoSchema) 