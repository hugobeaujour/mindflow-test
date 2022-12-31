import { StepFunctions } from "aws-sdk";
// !! JUST FOR FAST DEV PURPOSE !!
import { Workflow } from "../../../frontend/interfaces/workflow";

const stepfunctions = new StepFunctions();

export async function updateStep(def: Workflow, step: string) {
    const params = {
        stateMachineArn: step,
        definition: JSON.stringify(def)
    };
    await stepfunctions.updateStateMachine(params).promise();
}