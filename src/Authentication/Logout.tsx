import { useAuth, useUserOnlyPage } from "./AuthContext";
import { useEffect } from "react";

const Logout = () => {
    useUserOnlyPage();

    const { logout } = useAuth();

    useEffect(() => {
        logout();
    });

    return <div>Logging you out...</div>;
};

export default Logout;
