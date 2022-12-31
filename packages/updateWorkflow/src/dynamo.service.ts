import { DocumentClient } from "aws-sdk/clients/dynamodb";
// !! JUST FOR FAST DEV PURPOSE !!
import { Workflow } from "../../../frontend/interfaces/workflow";

const documentClient = new DocumentClient();

export async function updateWorkflow(userId: string, id: string, workflow: Workflow) {
    const updateParams: DocumentClient.UpdateItemInput = {
        TableName: "Sold",
        Key: { userId, id },
        UpdateExpression: "set #data = :data",
        ExpressionAttributeValues: { ":data": workflow },
        ExpressionAttributeNames: { "#data": "data" },
        ReturnValues: "ALL_NEW"
    };
    const res = await documentClient.update(updateParams).promise();
    return res.Attributes as { id: string; data: Workflow } | undefined;
}
