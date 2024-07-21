# Transaction Tracker for Etherscan

This project is a transaction tracker that uses the Etherscan API to find and track transactions between a starting address and a destination address on the Ethereum blockchain.

## Features

- Tracks transactions from a main address to a destination address
- Uses Etherscan API for fetching transaction data
- Outputs results to a CSV file
- Configurable address limit to prevent infinite loops

## Prerequisites

- Node.js (v14 or later recommended)
- npm (Node Package Manager)
- An Etherscan API key

## Installation

1. Clone the repository:

```
git clone https://github.com/abdomody35/transaction-tracker.git
cd transaction-tracker
```

2. Install dependencies:

```
npm install
```

## Configuration

1. Create a `.env` file in the root directory of the project.

2. Add the following variables to the `.env` file:

```
ETHERSCAN_API_KEY=your_etherscan_api_key
MAIN_ADDRESS=starting_wallet_address
DESTINATION_ADDRESS=destination_wallet_address
LIMIT=1000
```

- `ETHERSCAN_API_KEY`: Your Etherscan API key
- `MAIN_ADDRESS`: The wallet address to start searching from
- `DESTINATION_ADDRESS`: The wallet address to stop the transaction path at
- `LIMIT`: (Optional) Maximum number of addresses to check (default is 1000)

## Usage

1. After setting up the `.env` file, run the tracker:

```
npm start
```

2. The script will start tracking transactions from the main address to the destination address.

3. Progress will be logged in the console.

4. Once finished, the results will be saved in a file named `transactions.csv` in the project root directory.

## Output

The `transactions.csv` file will contain the following information for each relevant transaction:

- Transaction hash
- From address
- To address
- Timestamp
- Value
- Error status
- Contract address (if applicable)

## Troubleshooting

- If you encounter rate limiting issues, try increasing the delay between API calls in the `track.ts` file.
- Ensure your Etherscan API key has the necessary permissions to fetch transaction data.
- Check the console output for any error messages or API responses for debugging.

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to fork and create pull requests if you want to contribute.

## License

This project is licensed unde the [MIT](https://choosealicense.com/licenses/mit/) license.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
