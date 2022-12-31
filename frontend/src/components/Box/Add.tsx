// libraries
import { Button, ButtonProps } from "@chakra-ui/react";

function Add(props: ButtonProps) {

    return (
        <Button w="200px" border="1px solid black" {...props}>
            Add
        </Button>
    );
}

export default Add;
