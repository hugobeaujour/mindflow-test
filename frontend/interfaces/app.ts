import { Workflow } from "./workflow";

export interface AppState {
    contentStore: ContentState;
}

export interface ContentState {
    workflow: Workflow;
    status: string;
    error?: string;
}