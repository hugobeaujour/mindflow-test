// libraries
import { Center, Flex, FlexProps, Link } from "@chakra-ui/react";

// components
import Exist from "./Exist";

// store
import { useAppSelector } from "../../app/hooks";

// interfaces
import { AppState } from "../../../interfaces/app";

function List(props: { name: string } & FlexProps) {
    const { name } = props;

    const workflow = useAppSelector((app: AppState) => app.contentStore).workflow;

    const action = workflow[name];

    if (!action) {
        return <div />;
    }
    return (
        <Flex {...props}>
            <Center>
                <Exist action={workflow[name]} />
            </Center>
            <Flex>
                {action.next.map((act) => (
                    <Center>
                        <Flex>
                            <Link />
                            <List name={act} />
                        </Flex>
                    </Center>
                ))}
            </Flex>
        </Flex>
    );
}

export default List;
