const { Client, FileId, FileContentsQuery } = require("@hashgraph/sdk");
require('dotenv').config();
const fs = require('fs');

async function viewFile() {
    // Initialize the Hedera client
    const client = Client.forTestnet();
    client.setOperator(process.env.MY_ACCOUNT_ID, process.env.MY_PRIVATE_KEY);

    // Read the fileId from fileId.txt
    fs.readFile('fileId.txt', 'utf8', async (err, fileIdStr) => {
        if (err) {
            console.error("Error reading fileId.txt:", err);
            return;
        }

        try {
            // Convert the fileId string to a FileId object
            const fileId = FileId.fromString(fileIdStr.trim());

            // Create a query to get the file contents
            const fileContentsQuery = new FileContentsQuery()
                .setFileId(fileId);

            // Execute the query
            const fileContents = await fileContentsQuery.execute(client);

            // Log the file contents
            console.log("File Contents:", fileContents.toString());
        } catch (error) {
            console.error("Error retrieving file contents:", error);
        }
    });
}

// Call the function
viewFile();
