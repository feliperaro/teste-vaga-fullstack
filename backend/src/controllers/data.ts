import { Request, Response } from "express";

import { isCpfCnpjValid } from "../utils/cpfCnpj";
import { processFile } from "../utils/csv";
import { formatCurrency, isToFormatCurrency } from "../utils/currency";
import { formatDate, isToFormatDate } from "../utils/date";

export const getData = async (req: Request, res: Response) => {
  const csvFilePath = "../data.csv";
  let data: Array<Object> = [];

  try {
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

    res.status(200).json({
      pageSize,
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
