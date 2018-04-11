var CryptoJS = require('crypto-js')
var fs = require('fs')
var leftpad = require('leftpad')

var start = Date.now()


var filename = "generate.txt"
const defaults = {
    flags: 'w',
    encoding: 'utf8',
    fd: null,
    mode: 0o666,
    autoClose: true
  }
var stream = fs.createWriteStream(filename, defaults)

fd = fs.openSync(filename, 'a')

var configs = {
    methods : {
        SHA256 : true,
        HS : false,
    },
    options : {
        limit : 99999999,
        key : "Le5d4f69g1sfkb54g43f7ap9",
        console : false,
        writeInFile : false,
        mod: 10000
    }   
}


stream.once('open', function(fd) {
    // Starting
    start = Date.now()
    console.log("Starting")
    
    if(configs.methods.SHA256){
        stream.write("\n---==============================SHA256==============================---\n\n")

        let i = 0; 
        for(; i <= configs.options.limit; i++){
            let word = leftpad(i, 8)
            let generate = CryptoJS.SHA256(word).toString(CryptoJS.enc.utf8).toUpperCase()
            if (configs.options.writeInFile) stream.write(leftpad(i, 8) + ":" + generate + "\n")
            if (configs.options.console) console.log(leftpad(i, 8) + ":" + generate + "\n")
            
            if (i % configs.options.mod === 0) console.log(i)
        } 
    }
    
    if(configs.methods.HS){
        stream.write("\n---=============================HmacSHA1=============================---\n\n")

        let i = 0; 
        for(; i <= configs.options.limit; i++){
            let word = leftpad(i, 8)
            let generate = CryptoJS.HmacSHA1(word, key).toString(CryptoJS.enc.utf8).toUpperCase()
            if (configs.options.writeInFile) stream.write(leftpad(i, 8) + ":" + generate + "\n")
            if (configs.options.console) console.log(leftpad(i, 8) + ":" + generate + "\n")
            
            if (i % configs.options.mod === 0) console.log(i)
        } 
    }

    // Finished
    let message = `Finished in: ${ ( Date.now() - start ) / 1000 } seconds`
    if (configs.options.writeInFile) {
        stream.write(message)
        stream.end()
    }
    console.log(message)
});