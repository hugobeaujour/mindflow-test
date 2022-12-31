// libraries
import { Center, Flex, FlexProps } from "@chakra-ui/react";

// components
import Add from "../Box/Add";
import List from "../Box/List";

function Homepage(props: FlexProps) {
    return (
        <Flex className="grid" direction="column" {...props}>
            <List name="start" />
            <Center>
                <Add mt="40px" />
            </Center>
        </Flex>
    );
}

export default Homepage;
