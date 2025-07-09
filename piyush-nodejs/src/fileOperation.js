import fs from "fs";

// asynchornous
fs.writeFile("./test.txt", "Hello world Write file data", () => {
  console.log("write file operation !");
});

const fileData = fs.readFile("./test.text", "utf-8", (err, result) => {
  if (err) console.log(err);
  else console.log(result);
});

console.log(fileData);

fs.appendFile("src/file/serverLogs.txt", `\n ${currentTime}`, (err) => {
  if (err) console.log(err);
});

fs.unlink("./resultData.txt", (err) => {
  if (err) console.log("Error in Deleting File");
  else console.log("File Deleted Successfully!");
});
