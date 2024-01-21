const fs = require("fs");
const path = require("path");
const notes = path.join("05-merge-styles", "styles");
const bundle = path.join("05-merge-styles", "project-dist", "bundle.css");

fs.readdir(notes, { withFileTypes: true }, (err, files) => {
    const streamWrite = fs.createWriteStream(bundle);
    if (err) {
        throw err
    } else {
        files.forEach((file) => {
            const filePath = path.join(notes, file.name);
            const fileExt = path.parse(filePath).ext.slice(1);
            if (fileExt === "css") {
                const streamRead = fs.createReadStream(filePath);
                streamRead.pipe(streamWrite);
            }  
      });
    };
});