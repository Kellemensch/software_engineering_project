import { Link } from "react-router-dom";
import { useAuth, useUserOnlyPage } from "./Authentication/AuthContext";
import "./Profile.css";

export default function Profile() {
    useUserOnlyPage();

    const { user } = useAuth();

    return (
        <div className="profile-page">
            {user && (
                <article className="profile-card">
                    <div className="profile-avatar">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="120"
                            height="120"
                            stroke="black"
                            fill="none"
                            strokeWidth="2"
                        >
                            <circle cx="12" cy="8" r="4" />
                            <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                        </svg>
                    </div>

                    <div className="profile-details">
                        <p>
                            <span className="label">Name:</span>{" "}
                            {user!.firstname}
                        </p>
                        <p>
                            <span className="label">Lastname:</span>{" "}
                            {user!.lastname}
                        </p>

                        <p>
                            <span className="label">Mail:</span> {user!.email}
                        </p>
                        {user!.phone && (
                            <p>
                                <span className="label">Phone number:</span>{" "}
                                {user!.phone}
                            </p>
                        )}

                        <p className="change-password">Change Password</p>

                        <p className="group-id">
                            Group ID: <span>{user!.groupId}</span>
                        </p>
                    </div>

                    <Link className="logout-button" to="/logout">Logout</Link>
                </article>
            )}
        </div>
    );
}
