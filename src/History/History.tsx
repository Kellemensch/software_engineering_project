import SalespersonHistory from "./SalespersonHistory";
import AccountantHistory from "./AccountantHistory";
import ManagerHistory from "./ManagerHistory";

export default function History() {
    /* 0=sales, 1=accountant, 2=manager*/
    let user = 1;

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