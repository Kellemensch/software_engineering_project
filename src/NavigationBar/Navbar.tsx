import SalespersonNavbar from "./SalespersonNavbar";
import AccountantNavbar from "./AccountantNavbar";
import ManagerNavbar from "./ManagerNavbar";
import { useAuth } from "../Authentication/AuthContext";

export default function Navbar() {
    const { user } = useAuth();

    switch (user?.type) {
        case "salesperson":
            return <SalespersonNavbar />;
        case "accountant":
            return <AccountantNavbar />;
        case "manager":
            return <ManagerNavbar />;
        default:
            return null;
    }
}
