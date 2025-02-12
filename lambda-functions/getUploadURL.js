import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({});
const BUCKET_NAME = "theft-report-files";

export const handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        const { fileName, fileType } = body;

        if (!fileName || !fileType) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "fileName and fileType are required." })
            };
        }

        const fileKey = `${Date.now()}-${fileName}`;

        const params = {
            Bucket: BUCKET_NAME,
            Key: fileKey,
            ContentType: fileType,
            ACL: "public-read"
        };

        const signedUrl = await getSignedUrl(s3, new PutObjectCommand(params), { expiresIn: 300 });

        return {
            statusCode: 200,
            body: JSON.stringify({ uploadUrl: signedUrl, fileKey })
        };

    } catch (error) {
        console.error("Error generating pre-signed URL:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error generating upload URL", error: error.message })
        };
    }
};
