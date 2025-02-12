import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

// Create the DynamoDB client and DocumentClient
const client = new DynamoDBClient({});
const dynamoDB = DynamoDBDocumentClient.from(client);

const s3 = new S3Client({});
const BUCKET_NAME = 'theft-report-files';

export const handler = async (event) => {
    const body = JSON.parse(event.body);
    const { manager, dateTime, description, files, ...otherData } = body;

    // Upload files to S3
    const uploadedFiles = [];
    for (const file of files) {
        const fileKey = `${Date.now()}-${file.name}`;
        const params = {
            Bucket: BUCKET_NAME,
            Key: fileKey,
            Body: Buffer.from(file.data, 'base64'), // use Buffer to decode base64
            ACL: 'public-read',
            ContentType: file.type
        };

        try {
            await s3.send(new PutObjectCommand(params)); // Using the new SDK v3 method
            uploadedFiles.push(`https://${BUCKET_NAME}.s3.amazonaws.com/${fileKey}`);
        } catch (error) {
            console.error("Error uploading file:", error);
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'File upload failed', error: error.message })
            };
        }
    }

    // Save data to DynamoDB
    const report = {
        id: `${Date.now()}`,
        manager,
        dateTime,
        description,
        files: uploadedFiles,
        ...otherData
    };

    const dynamoDBParams = {
        TableName: "Thefts_Reports_Table", // Make sure TableName is correct
        Item: report
    };

    try {
        // Use PutCommand for DynamoDB DocumentClient in SDK v3
        await dynamoDB.send(new PutCommand(dynamoDBParams)); // Corrected line
    } catch (error) {
        console.error("Error saving report to DynamoDB:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error saving report', error: error.message })
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Report submitted successfully', report })
    };
};