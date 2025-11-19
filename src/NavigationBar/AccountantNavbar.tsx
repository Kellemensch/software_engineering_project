import { useState } from "react";
import "./Navbar.css";

export default function AccountantNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header id="head">
      <nav id="navbar">
        <ul id="upper">
          <li>
            <a className="logo" href="/">Snap<b>Rec</b></a>
          </li>

          <li>
            <a className="hide" href="/review">Review</a>
          </li>
          <li>
            <a className="hide" href="/history">History</a>
          </li>
          <li>
            <a className="hide" href="/profile">Profile</a>
          </li>

          <li>
            <button className="menu" onClick={() => setMenuOpen(true)} aria-label="Open Menu">
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
            <button onClick={() => setMenuOpen(false)} aria-label="Close Menu" className="close-button" >
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
            <a className="link" href="/review" onClick={() => setMenuOpen(false)}>Review</a>
          </li>
          <li>
            <a className="link" href="/history" onClick={() => setMenuOpen(false)}>History</a>
          </li>
          <li>
            <a className="link" href="/profile" onClick={() => setMenuOpen(false)}>Profile</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}