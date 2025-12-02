import SalespersonHistory from "./SalespersonHistory";
import AccountantHistory from "./AccountantHistory";
import ManagerHistory from "./ManagerHistory";
import { useAuth, useUserOnlyPage } from "../Authentication/AuthContext";
import { useNavigate } from "react-router-dom";

export default function History() {
    useUserOnlyPage();
    const { user } = useAuth();

    const navigate = useNavigate();

    switch (user!.type) {
        case "salesperson":
            return <SalespersonHistory />;
        case "accountant":
            return <AccountantHistory />;
        case "manager":
            return <ManagerHistory />;
        default:
            navigate("/login");
    }
}
