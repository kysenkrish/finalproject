const { Client, AccountBalanceQuery, TransactionRecordQuery } = require('@hashgraph/sdk');
require("dotenv").config();

async function viewLedgerState() {
    const client = Client.forTestnet();

    try {
        const accountIds = process.env.MY_ACCOUNT_ID.split(',').map(id => id.trim());
        const accountBalances = await fetchAccountBalances(client, accountIds);
        console.log('Account Balances:');
        accountBalances.forEach(({ accountId, balance }) => {
            console.log(`${accountId.toString()}: ${balance.toString()} tinybars`);
        });

        console.log();
        const transactionRecords = await fetchRecentTransactions(client);
        console.log('Recent Transactions:');
        transactionRecords.forEach(record => {
            console.log(`Transaction ID: ${record.transactionId}`);
            console.log(`    Receipt Status: ${record.receipt.status.toString()}`);
            console.log(`    Consensus Timestamp: ${record.consensusTimestamp}`);
            console.log(`    Memo: ${record.memo}`);
            console.log();
        });

    } catch (error) {
        console.error('Error fetching ledger state:', error);
    } finally {
        await client.close();
    }
}

async function fetchAccountBalances(client, accountIds) {
    const balancePromises = accountIds.map(accountId =>
        new AccountBalanceQuery()
            .setAccountId(accountId)
            .execute(client)
            .then(balance => ({ accountId, balance }))
    );
    return await Promise.all(balancePromises);
}

async function fetchRecentTransactions(client) {
    try {
        return await new TransactionRecordQuery()
            .setLimit(5) // Set limit for transaction records
            .execute(client);
    } catch (error) {
        console.error('Error fetching recent transactions:', error);
        return []; // Return an empty array on error
    }
}

viewLedgerState().catch(err => console.error(err));
