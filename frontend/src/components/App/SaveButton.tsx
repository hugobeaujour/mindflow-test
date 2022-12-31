// libraries
import { Button, Spinner } from "@chakra-ui/react";

// store
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateWorkflow } from "../../features/content-slice";

// interfaces
import { AppState } from "../../../interfaces/app";

function SaveButton() {
    const contentStore = useAppSelector((app: AppState) => app.contentStore);
    const dispatch = useAppDispatch();

    if (contentStore.status === "succeeded_update") {
        return <Button background="green">Saved</Button>;
    }
    if (contentStore.status === "failed_update") {
        return <Button background="red">Not saved</Button>;
    }
    if (contentStore.status === "loading_update") {
        return (
            <Button background="white">
                <Spinner color="white" />
            </Button>
        );
    }
    return (
        <Button background="white" onClick={() => dispatch(updateWorkflow(contentStore.workflow))}>
            Save
        </Button>
    );
}

export default SaveButton;
