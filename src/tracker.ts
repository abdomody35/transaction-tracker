import axios from "axios";
import { Transaction, TransactionPath } from "./types";

const track = async (
  apiKey: string,
  mainAddress: string,
  destinationAddress: string
) => {
  const visitedAddresses = new Set<string>();
  const relevantPaths: TransactionPath[] = [];
  const addressQueue: TransactionPath[] = [
    { transactions: [], lastAddress: mainAddress },
  ];
  const addressLimit = Number(process.env.LIMIT) || 1000; // Limit to prevent infinite loops

  while (addressQueue.length > 0 && visitedAddresses.size < addressLimit) {
    const currentPath = addressQueue.shift();
    if (!currentPath || visitedAddresses.has(currentPath.lastAddress)) continue;
    visitedAddresses.add(currentPath.lastAddress);

    console.log(
      `Fetching transactions for ${currentPath.lastAddress}, ${visitedAddresses.size} visited out of ${addressLimit}`
    );

    try {
      const response = await axios.get("https://api.etherscan.io/api", {
        params: {
          module: "account",
          action: "txlist",
          address: currentPath.lastAddress,
          startblock: 0,
          endblock: 99999999,
          page: 1,
          offset: 10000, // Max number of transactions per request
          sort: "asc",
          apikey: apiKey,
        },
      });

      if (response.data.status === "1" && Array.isArray(response.data.result)) {
        for (const tx of response.data.result) {
          if (tx.isError === "0") {
            const newTransaction: Transaction = {
              hash: tx.hash,
              from: tx.from,
              to: tx.to,
              timeStamp: tx.timeStamp,
              value: tx.value,
              isError: tx.isError,
              contractAddress: tx.contractAddress,
            };

            const newPath: TransactionPath = {
              transactions: [...currentPath.transactions, newTransaction],
              lastAddress: tx.to,
            };

            if (tx.to.toLowerCase() === destinationAddress.toLowerCase()) {
              console.log("Found a transaction to the destination address");
              relevantPaths.push(newPath);
            } else if (!visitedAddresses.has(tx.to)) {
              addressQueue.push(newPath);
            }

            if (tx.toAddress && !visitedAddresses.has(tx.toAddress)) {
              addressQueue.push({
                transactions: [...currentPath.transactions, newTransaction],
                lastAddress: tx.toAddress,
              });
            }
          }
        }
      } else {
        console.error(
          `API error for ${currentPath.lastAddress}:`,
          response.data.message
        );
      }

      // Add a delay to respect rate limits (5 calls per second for free API)
      await new Promise((resolve) => setTimeout(resolve, 200));
    } catch (error) {
      console.error(
        `Error fetching transactions for ${currentPath.lastAddress}:`,
        error
      );
    }
  }

  // Flatten all relevant transactions
  const allRelevantTransactions = relevantPaths.flatMap(
    (path) => path.transactions
  );

  return allRelevantTransactions;
};

export default track;
