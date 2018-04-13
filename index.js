const CryptoJS = require('crypto-js')
const Combinatorics = require('js-combinatorics')
const mongoose = require('mongoose')
const Correspondance = require('./model')
const SaveCorrespondance = require('./controller')
const readline = require('readline')

// Required for user confirmation on drop collection
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Mongoose stuff
const mongoDBURL = 'mongodb://127.0.0.1/cryptoDB';
mongoose.connect(mongoDBURL)
  .then(() =>  {
    console.log(`\n> Connection to ${mongoDBURL} succesful`)

    if(configs.reset){
      rl.question('\n> Confirm that you want to drop "correspondances" collection? Y/N: ', (answer) => {
        if(answer == 'Y' || answer == 'y')
          mongoose.connection.dropCollection('correspondances', (err) => {
          if (err) {
            return err
          }
          console.log("Collection dropped!")
        });
        
        rl.close();
      });
    
    }
  })
.catch((err) => console.error(err));

// 
const configs = {
  alphabets : [0,1,2,3,4,5,6,7,8,9], // Alphabets that will create words
  wordSize : 8, // The input word size, for ex: 012345 -> 6
  items: 400000, // How many word
  reset : false, // Delete collections (Correspondance Dictionnary ),
  information : true // Display some informations on console
}



// Create all combinaisons with repetition
const vocabularies = Combinatorics.baseN(configs.alphabets,configs.wordSize)

if(configs.information){
  console.log('---================================================---')
  console.log("   > Alphabets: " + configs.alphabets)
  console.log("   > Word size: " +configs.wordSize)
  console.log("   > Number of combinaisons with repetitions: " + vocabularies.length)
  console.log('---================================================---')
}

if(!configs.reset){
  var i = 0;
  var start = Date.now()
  vocabularies.map(element => {
    if( i == configs.items ) { console.log(((Date.now() - start) / 1000) + " secondes" ) }
    if( i++ <= configs.items || !configs.items ) {
      SaveCorrespondance(element.join('')); 
    } 
  })
} 

/* Crypto and leftpad stuff are inside mongoose save hook: @see ./model.js */