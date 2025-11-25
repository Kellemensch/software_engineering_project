import SalespersonReceiptInfo from "./SalespersonReceiptInfo";
import AccountantReceiptInfo from "./AccountantReceiptInfo";
import ManagerReceiptInfo from "./ManagerReceiptInfo";

import "./ReceiptInformation.css";

export default function ReceiptInformation({ user = 0 }) {
    /* 0=sales, 1=accountant, 2=manager*/

    switch (user) {
        case 0:
            return <SalespersonReceiptInfo />;
        case 1:
            return <AccountantReceiptInfo />;
        case 2:
            return <ManagerReceiptInfo />;
        default:
            return null;
    }
}
