import { Link, useNavigate } from "react-router";
import "./LoginRegister.css";
import { useRef } from "react";
import { useAuth } from "./AuthContext";

export default function Register() {
    const formRef = useRef<HTMLFormElement>(null);

    const { register } = useAuth();
    const navigate = useNavigate();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const data = new FormData(formRef.current!);

        const userInfo = {
            firstname: data.get("firstname") as string,
            lastname: data.get("lastname") as string,
            email: data.get("email") as string,
            phone: data.get("phone") as string,
            password: data.get("password") as string,
        };

        register(userInfo);
        navigate("/dashboard");
    }

    return (
        <div className="login-background">
            <div className="register-card">
                <h1>
                    Snap<b>Rec</b>
                </h1>
                <form
                    className="register-form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                >
                    <input type="text" placeholder="Name" name="firstname" />
                    <input
                        type="text"
                        placeholder="Last Name"
                        name="lastname"
                    />
                    <input type="email" placeholder="Email" name="email" />
                    <input
                        type="phone"
                        placeholder="Phone Number"
                        name="phone"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                    />
                    <button type="submit">Submit</button>
                </form>
                <Link to="/login">Switch to login</Link>
            </div>
        </div>
    );
}
