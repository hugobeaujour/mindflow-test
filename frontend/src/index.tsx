// libs
import { Suspense } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";

// store
import { Provider } from "react-redux";
import { store } from "./app/store";

// components
import App from "./components/App/App";

// css
import "./index.css";

const container = document.getElementById("root");
if (container) {
    const root = createRoot(container);
    root.render(
        <Provider store={store}>
            <Suspense fallback={<div />}>
                <ChakraProvider>
                    <App />
                </ChakraProvider>
            </Suspense>
        </Provider>
    );
}
