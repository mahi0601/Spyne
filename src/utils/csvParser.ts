import fs from "fs";
import { parse } from "csv-parse";

export const parseCSV = async (filePath: string) => {
  const data = fs.readFileSync(filePath, "utf8");
  const records = await new Promise((resolve, reject) => {
    parse(data, { columns: true }, (err, output) => {
      if (err) reject(err);
      resolve(output);
    });
  });

  return { valid: true, data: records };
};
