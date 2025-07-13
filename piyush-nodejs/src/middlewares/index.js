import fs from "fs";

export function logReqRes(fileName) {
  return (req, res, next) => {
    const date = new Date();
    let requestTime = date.toLocaleString();

    fs.appendFile(
      fileName,
      `\n${requestTime} : ${req.ip} : ${req.method} : ${req.path}  `,
      (err, data) => {
        next();
      }
    );
  };
}
