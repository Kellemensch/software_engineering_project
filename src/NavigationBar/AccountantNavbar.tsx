import { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router";

export default function AccountantNavbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header id="head">
            <nav id="navbar">
                <ul id="upper">
                    <li>
                        <Link className="logo" to="/">
                            Snap<b>Rec</b>
                        </Link>
                    </li>

                    <li>
                        <Link className="hide" to="/review">
                            Review
                        </Link>
                    </li>
                    <li>
                        <Link className="hide" to="/history">
                            History
                        </Link>
                    </li>
                    <li>
                        <Link className="hide" to="/profile">
                            Profile
                        </Link>
                    </li>

                    <li>
                        <button
                            className="menu"
                            onClick={() => setMenuOpen(true)}
                            aria-label="Open Menu"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="30px"
                                viewBox="0 -960 960 960"
                                width="30px"
                                fill="#000000"
                            >
                                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                            </svg>
                        </button>
                    </li>
                </ul>

                <ul id="sidemenu" className={menuOpen ? "open" : ""}>
                    <li className="close-menu">
                        <button
                            onClick={() => setMenuOpen(false)}
                            aria-label="Close Menu"
                            className="close-button"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="30px"
                                viewBox="0 -960 960 960"
                                width="30px"
                                fill="#000000"
                            >
                                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                            </svg>
                        </button>
                    </li>
                    <li>
                        <Link
                            className="link"
                            to="/review"
                            onClick={() => setMenuOpen(false)}
                        >
                            Review
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="link"
                            to="/history"
                            onClick={() => setMenuOpen(false)}
                        >
                            History
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="link"
                            to="/profile"
                            onClick={() => setMenuOpen(false)}
                        >
                            Profile
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
