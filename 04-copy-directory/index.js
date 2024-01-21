const fs = require("fs");
const path = require("path");
const notes = path.join("04-copy-directory", "files");
const notesCopy = path.join("04-copy-directory", "files-copy");

fs.mkdir(notesCopy, err => {
    if(err) throw err; 
 });

fs.readdir(notes, (err, files) => {
    if (err) {
        throw err
    } else {
    files.forEach((file) => {
        fs.copyFile(path.join(notes, file), `${notesCopy}/${file}`, () => {})
      });
    };
});