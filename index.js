const CryptoJS = require('crypto-js')
const Combinatorics = require('js-combinatorics')
const mongoose = require('mongoose')
const Correspondance = require('./model')
const SaveCorrespondance = require('./controller')

// Mongoose stuff
const mongoDBURL = 'mongodb://127.0.0.1/cryptoDB';
mongoose.connect(mongoDBURL)
  .then(() =>  console.log(`connection to ${mongoDBURL} succesful`))
.catch((err) => console.error(err));

// 
const configs = {
  alphabets : [0,1,2,3,4,5,6,7,8,9], // Alphabets that will create words
  wordSize : 2, // The input word size, for ex: 012345 -> 6
  reset : false, // Delete collections (Correspondance Dictionnary ),
  information : true // Display some informations on console
}

// Create all combinaisons with repetition
const vocabularies = Combinatorics.baseN(configs.alphabets,configs.wordSize)

if(configs.reset){
  mongoose.connection.db.dropCollection('Correspondance');
}
if(configs.information){
  console.log('---================================================---')
  console.log("   > Alphabets: " + configs.alphabets)
  console.log("   > Word size: " +configs.wordSize)
  console.log("   > Number of combinaisons with repetitions: " + vocabularies.length)
  console.log('---================================================---')
}
//vocabularies.map(element => {SaveCorrespondance(element.join(''))})

/* Crypto and leftpad stuff are inside mongoose save hook: @see ./model.js */