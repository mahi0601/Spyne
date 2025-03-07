import fs from "fs";
import { parse } from "json2csv";

export const generateOutputCSV = async (data: any) => {
    const csv = parse(data, { fields: ["serialNumber", "productName", "inputImageUrls", "outputImageUrls"] });
    fs.writeFileSync("output.csv", csv);
    console.log("✅ Output CSV Generated: output.csv");
};
