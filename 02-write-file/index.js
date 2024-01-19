const fs = require("fs");
const path = require("path");
const notes = path.join("02-write-file", "text.txt");

fs.open(notes, "a+", (err) => {
    if(err) throw err;
});

const output = fs.createWriteStream(notes);
const { stdin, stdout } = require("node:process");
process.on("SIGINT", () => process.exit());
process.on("exit", () => stdout.write("Goodbye"));
stdout.write("Hello! Write your text here:\n");
stdin.on("data", (text) => {
  if (text.toString().includes("exit")) process.exit();
  output.write(text);
});

