import { DocumentClient } from "aws-sdk/clients/dynamodb";
// !! JUST FOR FAST DEV PURPOSE !!
import { DynamoWorkflow, Workflow } from "../../../frontend/interfaces/workflow";

const documentClient = new DocumentClient();

export async function getWorkflow(userId: string, id: string) {
    const params: DocumentClient.GetItemInput = {
        TableName: "Workflows",
        Key: {
            userId,
            id
        }
    };
    const data = await documentClient.get(params).promise();
    return data.Item as DynamoWorkflow | undefined;
}
