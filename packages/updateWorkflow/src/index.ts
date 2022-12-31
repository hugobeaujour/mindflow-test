import { APIGatewayProxyEvent } from "aws-lambda";
import { Workflow } from "../../../frontend/interfaces/workflow";
import { updateWorkflow } from "./dynamo.service";
import { updateStep } from "./step.service";

interface Input {
    name: string;
    workflow: Workflow
}

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
        const body: Input = JSON.parse(event.body);
        
        // require to add the target for the definition
        // each step sent from the frontend should have the lambda "runAction" as target
        Object.values(body.workflow).forEach(value => {
            value.targetArn = "RUN-ACTION-LAMBDA"
        })

        // i am not sure creating a new Step every time is good
        // should be an update of a step existing. One step for one Book
        // not sure how to target the step exactly, but time flies for now
        await updateStep(body.workflow, "ARN-STEP-X");

        // if update step didn't work, we don't want to save it in dynamo wrongly
        // so it would have crash now
        // we're saving in dynamo because we want the "LIST BOOKS" be fast cheap and workable
        // list steps is not really good, so we're having a duplicate in dynamo

        // returning a test hardcoded ID workflow
        const workflowData = await updateWorkflow(event.requestContext.authorizer.userId, "test", body.workflow);
        if (!workflowData) {
            return returnResponse(400, {
                status: 400,
                code: "cannot_update",
                message: "Impossible de sauvegardé le workflow"
            });
        }

        return returnResponse(200, { workflow: workflowData.data });
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
