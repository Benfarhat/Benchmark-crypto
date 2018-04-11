var CryptoJS = require('crypto-js')
var fs = require('fs');
var leftpad = require('leftpad');

var start = Date.now();
var limit = 99999999;


var filename = "generate.txt"
const defaults = {
    flags: 'w',
    encoding: 'utf8',
    fd: null,
    mode: 0o666,
    autoClose: true
  };
var stream = fs.createWriteStream(filename, defaults);




fd = fs.openSync(filename, 'a');

stream.once('open', function(fd) {
    // Starting
    start = Date.now();
    console.log("starting");
    
    // Loop
    let i = 0; 
    for(; i <= limit; i++){
        let word = leftpad(i, 8);
        let generate = CryptoJS.SHA256(word).toString(CryptoJS.enc.utf8).toUpperCase()
        stream.write(word + ":" + generate + "\n");
    }

    // Finished
    let message = `Finished in: ${ ( Date.now() - start ) / 1000 } seconds`
    stream.write(message);
    stream.end();
    console.log(message)
}); 



