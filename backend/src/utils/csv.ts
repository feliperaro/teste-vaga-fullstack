import fs from "fs";
import { parse } from "csv-parse";

export const processFile = async (filePath: string) => {
  const records = [];
  const parser = fs.createReadStream(filePath).pipe(parse({}));
  for await (const record of parser) {
    records.push(record);
  }
  return records;
};
