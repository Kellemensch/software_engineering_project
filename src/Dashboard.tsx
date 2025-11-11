import { useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router";

const Dashboard = () => {
    const { loggedIn, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) navigate("/");
    }, [loggedIn]);

    return (
        <div>
            Welcome to your Dashboard! <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Dashboard;
