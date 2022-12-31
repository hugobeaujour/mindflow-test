// utils
import { apiWrapper } from "../utils/api";

// interfaces
import { Workflow } from "../../interfaces/workflow";

export async function getWorkflow() {
    try {
        const response = await apiWrapper({
            method: "GET",
            // for fast dev purposes we'll fetch locally
            path: "/test.json"
            //path: `/v1/workflow`,
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export async function uploadWorkflow(workflow: Workflow) {
    try {
        const response = await apiWrapper({
            method: "PUT",
            path: `/v1/workflow`,
            body: {
                workflow
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export async function launchWorkflow() {
    try {
        const response = await apiWrapper({
            method: "POST",
            path: `/v1/workflow/launch`,
        });
        return response;
    } catch (error) {
        throw error;
    }
}