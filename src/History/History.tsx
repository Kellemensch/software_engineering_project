import SalespersonHistory from "./SalespersonHistory";
import AccountantHistory from "./AccountantHistory";
import ManagerHistory from "./ManagerHistory";
import { useAuth, useUserOnlyPage } from "../Authentication/AuthContext";

export default function History() {
    useUserOnlyPage();
    const { user } = useAuth();

    switch (user!.type) {
        case "salesperson":
            return <SalespersonHistory />;
        case "accountant":
            return <AccountantHistory />;
        case "manager":
            return <ManagerHistory />;
        default:
            return null;
    }
}
