const fs = require("fs");
const path = require("path");
const notes = path.join("03-files-in-folder", "secret-folder");

fs.readdir(notes, { withFileTypes: true }, (error, files) => {
    files.forEach((file) => {
        if (error) console.log(error.message);
        if (file.isFile()) {
          const filePath = path.join(notes, file.name);
          const fileExt = path.parse(filePath).ext.slice(1);
          const fileName = path.parse(filePath).name;
          function writeParams(fileName, fileExt, filePath) {
            fs.stat(filePath, (error, stats) => {
              if (error) console.log(error.message);
              console.log(`${fileName} - ${fileExt} - ${stats.size / 1000}kb`);
              return stats.size;
            });
          }
          writeParams(fileName, fileExt, filePath);
        }
    });
});