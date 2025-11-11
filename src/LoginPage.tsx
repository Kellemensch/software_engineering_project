import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "./AuthContext";

const LoginPage = () => {
    // some code that see if we are already logged in
    let { loggedIn, login } = useContext(AuthContext);

    let navigate = useNavigate();
    useEffect(() => {
        if (loggedIn) navigate("/dashboard");
    }, [loggedIn]);

    return (
        <div>
            <button onClick={login}>Login as Salesperson</button>
            <button onClick={login}>Login as Accountant</button>
            <button onClick={login}>Login as Manager</button>
        </div>
    );
};

export default LoginPage;
