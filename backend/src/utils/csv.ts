import fs from "fs";
import { parse } from "csv-parse";

export const processFile = async (filePath: string, toLine: number = 10) => {
  const records = [];
  const parser = fs.createReadStream(filePath).pipe(
    parse({
      columns: true,
      toLine,
    })
  );
  for await (const record of parser) {
    records.push(record);
  }
  return records;
};
