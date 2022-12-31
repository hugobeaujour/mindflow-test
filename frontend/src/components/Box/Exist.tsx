// libraries
import { Center, CenterProps } from "@chakra-ui/react";

// interfaces
import { Action } from "../../../interfaces/workflow";

function Exist(props: { action: Action } & CenterProps) {
    const { action } = props;

    return (
        <Center w="200px" h="40px" border="1px solid black" {...props}>
            {action.name}
        </Center>
    );
}

export default Exist;
