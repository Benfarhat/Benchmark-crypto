const leftpad = require('leftpad')
const CryptoJS = require('crypto-js')
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

const config = {
    search: false
}


rl.question('\n> Do you want to search for the original word from a hash (otherwise we will ask you for a word to hash) Y/N: ', (answer) => {
    if(answer == 'Y' || answer == 'y')
        config.search = true;
    
    rl.close();
});

if(config.search){
    const test = "EF797C8118F02DFB649607DD5D3F8C7623048C9C063D532CC95C5ED7A898A64F"

    console.log(`Searching for ${test}`)

    for(let num = 1; num <= 99999999; num++) {
        let nombre = leftpad(num, 8)
        let hash = CryptoJS.SHA256(nombre).toString(CryptoJS.enc.hex).toUpperCase()
        if (test == hash) {
            console.log('=======================')
            console.log("Original number is: " + num)
            console.log('=======================')
        } 
    }
} else {
    rl.question('\n> Please give an identifier to hash: ', (answer) => {
        console.log('=======================')
        console.log("Hash is: " + CryptoJS.SHA256(answer).toString(CryptoJS.enc.hex).toUpperCase())
        console.log('=======================')

        rl.close();
        });
}


