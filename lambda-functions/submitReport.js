import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamoDB = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        const { manager, dateTime, description, files, ...otherData } = body;

        if (!files || !Array.isArray(files)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Files array is required." })
            };
        }

        const report = {
            id: `${Date.now()}`,
            manager,
            dateTime,
            description,
            files, // URLs of uploaded files
            ...otherData
        };

        await dynamoDB.send(new PutCommand({
            TableName: "Thefts_Reports_Table",
            Item: report
        }));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Report submitted successfully!" })
        };

    } catch (error) {
        console.error("Error saving report:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error saving report", error: error.message })
        };
    }
};