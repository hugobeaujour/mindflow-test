// libraries
import { Flex, FlexProps } from "@chakra-ui/react";

// components
import LaunchButton from "./LaunchButton";
import SaveButton from "./SaveButton";

function Header(props: FlexProps) {
    return (
        <Flex justify="space-between" p={3} {...props}>
            <LaunchButton/>
            <SaveButton/>
        </Flex>
    );
}

export default Header;
