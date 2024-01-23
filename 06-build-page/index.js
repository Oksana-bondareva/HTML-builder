const fs = require("fs");
const path = require("path");
const notesProject = path.join("06-build-page", "project-dist");
const notesStyles = path.join("06-build-page", "styles");
const htmlFile = path.join("06-build-page", "project-dist", "index.html");
const templateFile = path.join("06-build-page", "template.html");
const componentsFolder = path.join("06-build-page", "components");
const styleFile = path.join("06-build-page", "project-dist", "style.css");
const assetsFolder = path.join("06-build-page", "assets");
const assetsFolderCopy = path.join("06-build-page", "project-dist", "assets");

fs.mkdir(notesProject, err => {
    if(err) throw err; 
});

function folderToCopy(folder, folderCopy) {
    fs.mkdir(folderCopy, () => {});
    fs.readdir(folder, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.log(err.message)
        } else {
            files.forEach((file) => {
                if (!file.isFile()) {
                    fs.mkdir(path.join(folderCopy, file.name), () => {});
                    folderToCopy(`${folder}/${file.name}`, path.join(folderCopy, file.name));
                } else {
                    fs.copyFile(`${folder}/${file.name}`, path.join(folderCopy, file.name), () => {});
                }
            });
        };
    });
}
folderToCopy(assetsFolder, assetsFolderCopy);

fs.createReadStream(templateFile).on("data", (data) => {
    let dataString = data.toString();
    fs.readdir (componentsFolder, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.log(err.message)
        } else {
            files.forEach((file) => {
                const filePath = path.join(componentsFolder, file.name);
                const extName = path.extname(filePath);
                if (extName === ".html") {
                    let componentTitle = file.name.replace(extName, '');
                    componentTitle = `{{${componentTitle}}}`;
                    fs.createReadStream(filePath).on("data", (part) => {
                        dataString = dataString.replaceAll(componentTitle, part);
                        fs.writeFile(htmlFile, dataString, () => {});
                    });
                }
            })
        }
    })
});

fs.readdir(notesStyles, { withFileTypes: true }, (err, files) => {
    const streamWrite = fs.createWriteStream(styleFile);
    if (err) {
        throw err
    } else {
        files.forEach((file) => {
            const filePath = path.join(notesStyles, file.name);
            const streamRead = fs.createReadStream(filePath);
            streamRead.pipe(streamWrite);
        });
    };
});

