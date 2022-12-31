import { StepFunctions } from "aws-sdk";

const stepfunctions = new StepFunctions();

export async function launchStep(stepArn: string) {
    const params = {
        stateMachineArn: stepArn,
        input: 'Test Input',
        name: new Date().toISOString()
    };
    await stepfunctions.startExecution(params).promise();
}