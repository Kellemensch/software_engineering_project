import SalespersonNavbar from "./SalespersonNavbar";
import AccountantNavbar from "./AccountantNavbar";
import ManagerNavbar from "./ManagerNavbar";

export default function Navbar({ user = 2 }) {
    /* 0=sales, 1=accountant, 2=manager*/

    switch (user) {
        case 0:
            return <SalespersonNavbar />;
        case 1:
            return <AccountantNavbar />;
        case 2:
            return <ManagerNavbar />;
        default:
            return null;
    }
}
