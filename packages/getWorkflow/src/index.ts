import { APIGatewayProxyEvent } from "aws-lambda";
import { getStep } from "./step.service";

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
    try {
        // returning a test hardcoded workflow
        // should come from the front end
        // there should be a list endpoint to fetch all
        const workflowData = await getStep("ARN-TEST-1");
        if (!workflowData) {
            return returnResponse(404, {
                status: 404,
                code: "workflow_not_found",
                message: "Workflow introuvable"
            });
        }

        return returnResponse(200, { workflow: JSON.parse(workflowData) });
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
