import { useEffect, useState } from "react";
import {
    approveReceipt,
    deleteReceipt,
    getReceipt,
    rejectReceipt,
    type Receipt,
} from "../model/receipt";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth, useUserOnlyPage } from "../Authentication/AuthContext";

export default function SalespersonReceiptInfo() {
    useUserOnlyPage();

    const [receipt, setReceipt] = useState<Receipt>();

    const { user } = useAuth();

    const { receiptId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const receipt = getReceipt(receiptId!);
        if (!receipt) {
            alert("Receipt not found. Redirecting to dashboard...");
            navigate("/dashboard");
            return;
        }
        setReceipt(getReceipt(receiptId!));
    }, []);

    function handleDelete() {
        if (receipt) deleteReceipt(receipt.id);
        alert("Deleted! Redirecting to dashboard...");
        navigate("/dashboard");
    }

    function handleValidate() {
        if (receipt) approveReceipt(receipt.id, user!.email);
        alert("Approved! Redirecting to dashboard");
        navigate("/dashboard");
    }
    function handleReject() {
        if (receipt) rejectReceipt(receipt.id, user!.email);
        alert("Rejected! Redirecting to dashboard");
        navigate("/dashboard");
    }

    return (
        <div className="information-container">
            <div className="information-card">
                <h2>Receipt Information</h2>

                {receipt ? (
                    <>
                        <img
                            src={receipt.image}
                            className="information-image"
                            alt="Receipt"
                        />
                        <br />
                        <b>{receipt.title}</b>
                        <br />
                        <b>{receipt.subject}</b>
                        <br />
                        <b>{formatDate(receipt.date)}</b>
                        <br />
                        <b>{receipt.amount} €</b>
                        <br />
                        <b>{receipt.status}</b>

                        <div className="button-container">
                            {user!.type == "salesperson" && (
                                <button
                                    className="delete-button"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                            )}
                            {user!.type === "accountant" && (
                                <>
                                    <button
                                        type="submit"
                                        className="valid-button"
                                        onClick={handleValidate}
                                    >
                                        Valid
                                    </button>
                                    <button
                                        type="submit"
                                        className="not-valid-button"
                                        onClick={handleReject}
                                    >
                                        Not Valid
                                    </button>
                                </>
                            )}
                        </div>
                    </>
                ) : (
                    "Loading..."
                )}
            </div>
        </div>
    );
}

function formatDate(date: Date) {
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}
