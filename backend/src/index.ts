import express, { Express } from "express";
import fs from "fs";
import { parse } from "csv-parse";

const app: Express = express();
const port = 3000;

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.get("/api/data", (_, res) => {
  fs.readFile("../data.csv", function (err, fileData) {
    if (err) throw err;
    parse(fileData, { columns: false, trim: true }, function (err, rows) {
      if (err) throw err;
      console.log("rows.length", rows.length);
    });
  });

  res.send("Hello Api data");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
