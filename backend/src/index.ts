import express, { Express, Request, Response } from "express";
import { processFile } from "./utils/csv";
import { formatDate, isToFormatDate } from "./utils/date";
import { formatCurrency, isToFormatCurrency } from "./utils/currency";
import { isCpfCnpjValid } from "./utils/cpfCnpj";

const app: Express = express();

app.use(express.json());

app.get("/api/data", (req: Request, res: Response) => {
  (async () => {
    let data: Array<Object> = [];
    const csvFilePath = "../data.csv";

    const pageSize: number = Number(req.query.pageSize) || 10;
    const toLine: number = pageSize + 1;

    const rows: Array<Object> = await processFile(csvFilePath, toLine);
    rows.forEach((rowValue, index: number) => {
      const row: string = String(index + 1);
      let rowData: Object = { row };

      Object.entries(rowValue).forEach(([key, value]) => {
        if (isToFormatCurrency(key)) value = formatCurrency(value);
        else if (isToFormatDate(key)) value = formatDate(value);
        else if (key === "nrCpfCnpj") isCpfCnpjValid(value);
        rowData = { ...rowData, [key]: value };
      });

      data.push(rowData);
    });

    res.json({
      pageSize,
      data,
    });
  })();
});

const port = 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
