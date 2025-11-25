import SalespersonHistory from "./SalespersonHistory";
import AccountantHistory from "./AccountantHistory";
import ManagerHistory from "./ManagerHistory";

export default function History({ user = 0 }) {
    /* 0=sales, 1=accountant, 2=manager*/

    switch (user) {
        case 0:
            return <SalespersonHistory />;
        case 1:
            return <AccountantHistory />;
        case 2:
            return <ManagerHistory />;
        default:
            return null;
    }
}
