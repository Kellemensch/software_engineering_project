import { useEffect } from "react";
import { useNavigate } from "react-router";

const LoginPage = () => {
    // some code that see if we are already logged in
    let navigate = useNavigate();
    useEffect(() => {
        navigate("/app");
    });

    return (
        <div>
            <button>Login as Salesperson</button>
            <button>Login as Accountant</button>
            <button>Login as Manager</button>
        </div>
    );
};

export default LoginPage;
