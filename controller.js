const mongoose = require('mongoose')
const Correspondance = require('./model')

module.exports = word => {
  let element;
  Tuples = new Correspondance({identity:word, hash:word})
  Tuples.save((err, saved) => {
    if (err) {
        if (err.code === 11000) { //error code for duplicate
          // message: 'E11000 duplicate key error collection: cryptoDB.correspondances index: identity_1 dup key: { : "dup" }'
          console.error("This correspondance already exists: " + err.message.split(':')[2])
        }            
    }
  })
}