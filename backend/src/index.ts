import express, { Express } from "express";
import { processFile } from "./utils/csv";
import { formatDate, isToFormatDate } from "./utils/date";
import { formatCurrency, isToFormatCurrency } from "./utils/currency";
import { isCpfCnpjValid } from "./utils/cpfCnpj";

const app: Express = express();

app.get("/api/data", (_, res) => {
  const csvFilePath = "../data.csv";

  (async () => {
    const rows: Array<string[]> = await processFile(csvFilePath);
    const headers: Array<string> = rows[0];

    let data: Array<Object> = [];
    rows.forEach((rowValue: string[], index: number) => {
      if (index === 0 || index > 10) return;

      const row: string = String(index + 1);
      let rowData: Object = { row };
      rowValue.forEach((value: string, i: number) => {
        const column = headers[i];
        if (isToFormatCurrency(column)) value = formatCurrency(value);
        else if (isToFormatDate(column)) value = formatDate(value);
        else if (column === "nrCpfCnpj") isCpfCnpjValid(value); 

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
