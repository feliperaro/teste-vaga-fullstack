import express, { Express } from "express";
import fs from "fs";
import { parse } from "csv-parse";

const app: Express = express();

app.get("/", (_, res) => {
  res.send("Hello World!");
});

const processFile = async () => {
  const filePath = "../data.csv";

  const records = [];
  const parser = fs.createReadStream(filePath).pipe(parse({}));
  for await (const record of parser) {
    records.push(record);
  }
  return records;
};

app.get("/api/data", (_, res) => {
  (async () => {
    const rows: Array<string[]> = await processFile();
    const headers: Array<string> = rows[0];

    let data: Array<Object> = [];
    rows.forEach((rowValue: string[], index: number) => {
      if (index === 0) return;

      const row: string = String(index + 1);
      let rowData: Object = { row };
      rowValue.forEach((value: string, i: number) => {
        const column = headers[i];
        rowData = { ...rowData, [column]: value };
      });

      data.push(rowData);
    });
    res.send(data);
  })();
});

const port = 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
