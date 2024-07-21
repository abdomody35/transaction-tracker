interface Transaction {
  hash: string;
  from: string;
  to: string;
  timeStamp: string;
  value: string;
  isError: string;
  contractAddress: string;
}

interface TransactionPath {
  transactions: Transaction[];
  lastAddress: string;
}

export type { Transaction, TransactionPath };
