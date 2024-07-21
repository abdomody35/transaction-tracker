import dotenv from "dotenv";
import track from "./src/tracker";
import { writeTransactionsToCSV } from "./src/helpers";

dotenv.config();

async function main() {
  const apiKey = process.env.ETHERSCAN_API_KEY; // Your_API_KEY
  const mainAddress = process.env.MAIN_ADDRESS; // Main_address_to_start_from
  const destination_address = process.env.DESTINATION_ADDRESS; // Destination_address_to_stop_at

  if (!apiKey || !mainAddress || !destination_address) {
    console.error("Missing required environment variables");
    process.exit(1);
  }

  try {
    const transactions = await track(apiKey, mainAddress, destination_address);
    if (transactions && transactions.length > 0) {
      await writeTransactionsToCSV(transactions);
      console.log(
        "Transactions leading to the destination address found and saved to CSV",
        "transactionCount:",
        transactions.length
      );
    } else {
      console.log("No transactions found leading to the destination address");
    }
  } catch (error) {
    console.error("Error in API route:", error);
  }
}

main();
