import { APIGatewayProxyEvent } from "aws-lambda";

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
        // we're running what's in the event send by the step function
        // for the purpose of this text, we'll be displaying the event
        // and logging a small message with the name of the step
        
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
