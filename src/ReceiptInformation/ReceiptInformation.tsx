import SalespersonReceiptInfo from "./SalespersonReceiptInfo";
import AccountantReceiptInfo from "./AccountantReceiptInfo";
import ManagerReceiptInfo from "./ManagerReceiptInfo";

import "./ReceiptInformation.css";

export default function History() {
    /* 0=sales, 1=accountant, 2=manager*/
    let user = 0;

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