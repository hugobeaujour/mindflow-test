import { DocumentClient } from "aws-sdk/clients/dynamodb";
// !! JUST FOR FAST DEV PURPOSE !!
import { DynamoWorkflow, Workflow } from "../../../frontend/interfaces/workflow";

const documentClient = new DocumentClient();

export async function listWorkflows(userId: string, seqId?: string) {
    const queryParams: DocumentClient.QueryInput = {
        TableName: "Workflows",
        KeyConditionExpression: "userId = :uId",
        ExpressionAttributeValues: {
            ":uId": userId,
        },
        ScanIndexForward: false,
    };
    const workflows = await documentClient.query(queryParams).promise() as { Items?: DynamoWorkflow[], LastEvaluatedKey?: DynamoWorkflow };

    // paging
    if (seqId) {
        queryParams.ExclusiveStartKey = {
            userId,
            id: seqId
        };
    }

    const result: { workflows?: DynamoWorkflow[]; seqId?: string } = {
        workflows: workflows.Items,
        seqId: undefined,
    };

    if (workflows.LastEvaluatedKey) {
        // paging
        result.seqId = workflows.LastEvaluatedKey.id;
    }

    return result;
}
