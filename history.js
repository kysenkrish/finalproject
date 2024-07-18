require('dotenv').config();
const fetch = require('node-fetch');

async function getTransactionHistory() {
    const accountId = process.env.MY_ACCOUNT_ID; // Make sure this is correct
    console.log(`Using account ID: ${accountId}`);

    const response = await fetch(`https://testnet.mirrornode.hedera.com/api/v1/accounts/${accountId}/transactions`);

    if (!response.ok) {
        console.error(`Error fetching transactions: ${response.statusText} (status code: ${response.status})`);
        return;
    }

    const data = await response.json();

    // Check if there are transactions
    if (data.transactions && data.transactions.length > 0) {
        console.log("Transaction History:");
        data.transactions.forEach(transaction => {
            console.log(`Transaction ID: ${transaction.transactionId}`);
            console.log(`Timestamp: ${transaction.consensusTimestamp}`);
            console.log(`Status: ${transaction.result}`);
            console.log('---');
        });
    } else {
        console.log("No transactions found.");
    }
}

// Call the function
getTransactionHistory();
