import {createContext} from "react";

export const AppContext = createContext({
    authenticated: false,
    toggleAuthenticated: (isAuthenticated) => {
    }
});