// libraries
import { Button, Spinner } from "@chakra-ui/react";

// store
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { triggerWorkflow } from "../../features/content-slice";

// interfaces
import { AppState } from "../../../interfaces/app";

function LaunchButton() {
    const contentStore = useAppSelector((app: AppState) => app.contentStore);
    const dispatch = useAppDispatch();

    if (contentStore.status === "succeeded_launch") {
        return <Button background="green">Launched</Button>;
    }
    if (contentStore.status === "failed_launch") {
        return <Button background="red">Not saved</Button>;
    }
    if (contentStore.status === "loading_launch") {
        return (
            <Button background="white">
                <Spinner color="white" />
            </Button>
        );
    }
    return (
        <Button background="white" onClick={() => dispatch(triggerWorkflow())}>
            Launch
        </Button>
    );
}

export default LaunchButton;
