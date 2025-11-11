import { createContext, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";

interface Auth {
    loggedIn: boolean;

    login: () => void;
    logout: () => void;
}

export const AuthContext = createContext<Auth>({
    loggedIn: false,
    login: () => {},
    logout: () => {},
});

export const AuthContextProvider: FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        console.log(`new login state: ${loggedIn}`);
    }, [loggedIn]);

    function login() {
        setLoggedIn(true);
    }
    function logout() {
        setLoggedIn(false);
    }

    return (
        <AuthContext value={{ loggedIn, login, logout }}>
            {children}
        </AuthContext>
    );
};
