// libraries
import { useEffect } from "react";

// components
import Header from "./Header";
import Homepage from "../Pages/Homepage";

// store
import { useAppDispatch } from "../../app/hooks";
import { fetchWorkflow } from "../../features/content-slice";

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        // should be a list but for fast dev purposes we'll be fetching it directly
        dispatch(fetchWorkflow());
    }, []);

    return (
        <div>
            <Header/>
            <Homepage pt="40px" pb="40px"/>
        </div>
    );
}

export default App;
