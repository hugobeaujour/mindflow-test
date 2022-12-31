// libraries
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// services
import { getWorkflow, launchWorkflow, uploadWorkflow } from "../services/content-service";

// interfaces
import { ContentState } from "../../interfaces/app";
import { Workflow } from "../../interfaces/workflow";

const initialState: ContentState = {
    workflow: {},
    status: "idle",
    error: undefined,
};

export const fetchWorkflow = createAsyncThunk("get-workflow", async () => {
    const response = await getWorkflow();
    if (response && response.status === 200) {
        return response.data as Workflow;
    }
    throw response.data;
});

export const updateWorkflow = createAsyncThunk("update-workflow", async (workflow: Workflow) => {
    const response = await uploadWorkflow(workflow);
    if (response && response.status === 200) {
        return workflow;
    }
    throw response.data;
});

export const triggerWorkflow = createAsyncThunk("launch-workflow", async () => {
    const response = await launchWorkflow();
    if (response && response.status === 200) {
        return;
    }
    throw response.data;
});

const contentSlice = createSlice({
    name: "content",
    initialState,
    reducers: {
        updateLocalWorkflow(state, action: PayloadAction<Workflow>) {
            state.workflow = action.payload;
            state.status = "idle"
            state.error = undefined
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchWorkflow.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchWorkflow.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.workflow = action.payload;
            })
            .addCase(fetchWorkflow.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            .addCase(updateWorkflow.pending, (state) => {
                state.status = "loading_update";
            })
            .addCase(updateWorkflow.fulfilled, (state, action) => {
                state.status = "succeeded_update";
                state.workflow = action.payload;
            })
            .addCase(updateWorkflow.rejected, (state, action) => {
                state.status = "failed_update";
                state.error = action.error.message;
            })

            .addCase(triggerWorkflow.pending, (state) => {
                state.status = "loading_launch";
            })
            .addCase(triggerWorkflow.fulfilled, (state, action) => {
                state.status = "succeeded_launch";
            })
            .addCase(triggerWorkflow.rejected, (state, action) => {
                state.status = "failed_launch";
                state.error = action.error.message;
            });
    },
});

export const { updateLocalWorkflow } = contentSlice.actions;

export default contentSlice.reducer;
