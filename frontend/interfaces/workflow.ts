export interface Action {
    name: string;
    url: string;
    method: string;
    body?: string;
    targetArn?: string;
    next: string[];
}

export interface DynamoWorkflow {
    id: string;
    data: Workflow;
    arn: string;
    name: string;
}

export interface Workflow {
    [id: string]: Action
}