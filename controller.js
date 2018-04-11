const mongoose = require('mongoose')
const Correspondance = require('./model')

module.exports = word => {
  let element;
  Tuples = new Correspondance({identity:word, hash:word})
  Tuples.save((err, saved) => {
    if (err) {
        if (err.code === 11000) { //error code for duplicate
          console.error("This correspondance already exists: " + err.message)
        }            
    }
  })
}