const { Client, FileCreateTransaction, TransactionReceiptQuery } = require("@hashgraph/sdk");
const fs = require('fs');
require('dotenv').config();

async function uploadFile() {
    const client = Client.forTestnet();
    client.setOperator(process.env.MY_ACCOUNT_ID, process.env.MY_PRIVATE_KEY);

    fs.readFile('output.txt', 'utf8', async (err, data) => {
        if (err) {
            console.error("Error reading the file:", err);
            return;
        }

        try {
            const fileCreateTx = new FileCreateTransaction().setContents(data);
            const fileCreateTxResponse = await fileCreateTx.execute(client);
            const transactionId = fileCreateTxResponse.transactionId;

            console.log(`File create transaction ID: ${transactionId}`);

            // Wait for the transaction to be confirmed
            const receipt = await new TransactionReceiptQuery()
                .setTransactionId(transactionId)
                .execute(client);

            // Log the full receipt
            console.log(`File create transaction receipt: ${JSON.stringify(receipt)}`);

            const fileId = receipt.fileId.toString(); // Convert to string
            console.log("File ID:", fileId);

            // Write fileId to another file
            fs.writeFile('fileId.txt', fileId, (err) => {
                if (err) {
                    console.error("Error writing fileId to file:", err);
                } else {
                    console.log("fileId written to fileId.txt");
                }
            });
        } catch (error) {
            console.error("Error during transaction:", error);
        }
    });
}

// Call the function
uploadFile();
