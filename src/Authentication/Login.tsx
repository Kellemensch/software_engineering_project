import { useState } from "react";
import "./LoginRegister.css";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const result = login(email, password);
        setError(!result);
        if (result) navigate("/dashboard");
    }

    function autoLogin(id: number) {
        const logins = [
            ["salesperson@example.com", "changeme"],
            ["accountant@example.com", "password"],
            ["manager@example.com", "DonkeyKong"],
        ];

        login(logins[id][0], logins[id][1]);
        navigate("/dashboard");
    }

    return (
        <div className="login-background">
            <div className="login-card">
                <h1>
                    Snap<b>Rec</b>
                </h1>
                {error && <p className="error-message">An error occured</p>}
                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Mail"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                </form>
                <Link to="/register">Switch to Signup</Link>

                <hr />
                <ul className="autologin-list">
                    <li>
                        <button onClick={() => autoLogin(0)}>
                            Login as default Salesperson
                        </button>
                    </li>
                    <li>
                        <button onClick={() => autoLogin(1)}>
                            Login as default Accountant
                        </button>
                    </li>
                    <li>
                        <button onClick={() => autoLogin(2)}>
                            Login as default Manager
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}
