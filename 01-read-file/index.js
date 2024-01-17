const fs = require("fs");
const path = require('path');
const notes = path.join("01-read-file", "text.txt");
const stream = new fs.ReadStream(notes, {encoding: 'utf-8'});
stream.on('readable', function(){
    let data = stream.read();
    console.log(data);
});