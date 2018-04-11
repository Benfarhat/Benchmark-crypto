const CryptoJS = require('crypto-js')
const fs = require('fs')
const mongoose = require('mongoose')
const Model = require('./model')


const mongoDBURL = 'mongodb://127.0.0.1/cryptoDB';
mongoose.connect(mongoDBURL)
  .then(() =>  console.log(`connection to ${mongoDBURL} succesful`))
.catch((err) => console.error(err));

// Get last element inserted
// db.getCollection('cryptos').find({}).sort({'id':-1}).limit(1)

let last = Model
    .findOne()
    .select({ "id": 1, "_id": 0})
    .sort({'id':'desc'})
    .exec()
    .catch()
    .then((result) => {startCrypto(result.id)})



const startCrypto = start => {
  let element;
let i = start +1 ;
for(; i < 20; i++){
    element = new Model({id:i, identity:i, hash:i})
    element.save().then((a,b) => console.log())
}  
}

/* Crypto and leftpad stuff are inside mongoose save hook: @see ./model.js */