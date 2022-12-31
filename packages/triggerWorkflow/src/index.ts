import { APIGatewayProxyEvent } from "aws-lambda";
import { getWorkflow } from "./dynamo.service";
import { launchStep } from "./step.service";

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
        !event.requestContext.authorizer?.userId ||
        !event.body
    ) {
        return returnResponse(400, {
            status: 400,
            code: "wrong_request",
            message: "Requête incomplète",
        });
    }
    try {
        // trying to get data as JSON
        const body: { step: string } = JSON.parse(event.body);

        const workflow = await getWorkflow(event.requestContext.authorizer.userId, body.step);
        if (!workflow) {
            return returnResponse(404, {
                status: 404,
                code: "workflow_not_found",
                message: "Workflow doesn't exists"
            });
        }

        await launchStep(workflow.arn);

        return returnResponse(200, {});
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
