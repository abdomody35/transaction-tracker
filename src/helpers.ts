import { writeFileSync } from "fs";
import { parse } from "json2csv";
import { Transaction } from "./types";

const writeTransactionsToCSV = async (transactions: Transaction[]) => {
  const fields = [
    "hash",
    "from",
    "to",
    "timeStamp",
    "value",
    "isError",
    "contractAddress",
  ];
  const opts = { fields };
  try {
    const csv = parse(transactions, opts);
    writeFileSync("transactions.csv", csv);
    console.log("CSV file successfully processed");
  } catch (err) {
    console.error("Error writing to CSV file:", err);
    throw err;
  }
};

export { writeTransactionsToCSV };
