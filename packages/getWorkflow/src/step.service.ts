import { StepFunctions } from "aws-sdk";

const stepfunctions = new StepFunctions();

export async function getStep(step: string) {
    const params = {
        stateMachineArn: step
    };
    const data = await stepfunctions.describeStateMachine(params).promise();
    return data.definition;
}