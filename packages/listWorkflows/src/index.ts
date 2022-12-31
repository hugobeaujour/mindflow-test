import { APIGatewayProxyEvent } from "aws-lambda";
import { listWorkflows } from "./dynamo.service";

function returnResponse(statusCode: number, ret?: any) {
    return {
        body: JSON.stringify(ret),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Max-Age": 86400,
        },
        statusCode: statusCode,
    };
}

exports.handler = async function (event: APIGatewayProxyEvent) {
    console.debug(JSON.stringify(event, null, 2));
    if (
        // authenticated request
        !event.requestContext.authorizer?.userId
    ) {
        return returnResponse(400, {
            status: 400,
            code: "wrong_request",
            message: "Requête incomplète",
        });
    }
    try {
        const workflows = await listWorkflows(event.requestContext.authorizer.userId, event.queryStringParameters?.seqId);

        return returnResponse(200, workflows);
    } catch (error) {
        console.error("Generic error", error, event);
        return returnResponse(500, {
            status: 500,
            code: "internal_error",
            message: "Erreur inattendue, reessayez ou contactez le support",
            error: error,
        });
    }
};
