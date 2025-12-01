import { useEffect, useState } from "react";
import {
    approveReceipt,
    deleteReceipt,
    getReceipt,
    rejectReceipt,
    verifyReceipt,
    invalidateReceipt,
    type Receipt,
} from "../model/receipt";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth, useUserOnlyPage } from "../Authentication/AuthContext";
import { formatDate } from "../utils";
// @ts-ignore
import * as api from "../api/bankApi";
import { type BankPayment } from "../model/bankPayment";

import "./ReceiptInfo.css";

export default function ReceiptInfo() {
    useUserOnlyPage();
    const [receipt, setReceipt] = useState<Receipt>();
    const [payments, setPayments] = useState<BankPayment[]>([]);

    const { user } = useAuth();

    const { receiptId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const currentReceipt = getReceipt(receiptId!);
        if (!currentReceipt) {
            alert("Receipt not found. Redirecting to dashboard...");
            navigate("/dashboard");
            return;
        }
        setReceipt(currentReceipt);
    }, [receiptId]);

    function handleDelete() {
        if (receipt) deleteReceipt(receipt.id);
        alert("Succesfully Deleted!");
        navigate("/dashboard");
    }

    function handleValidate() {
        if (receipt) verifyReceipt(receipt.id, user!.email);
        alert("Successfully Validated! Sending to Manager for approval.");
        setReceipt(getReceipt(receiptId!));
        navigate("/dashboard");
    }

    function handleReject() {
        if (receipt) invalidateReceipt(receipt.id, user!.email);
        alert("Successfully Rejected!");
        setReceipt(getReceipt(receiptId!));
        navigate("/dashboard");
    }

    async function handleFetch() {
        if (!receipt) return;
        const payments = await api.fetchPaymentsForName(
            `${receipt.salesperson.firstname} ${receipt.salesperson.lastname}`
        );
        setPayments(payments);
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
                        <b className="warning">Don't throw away your receipt!!!</b>
                        <br />
                        <br />
                        <b>Title: </b>{receipt.title}
                        <br />
                        <b>Subject: </b>{receipt.subject}
                        <br />
                        <b>Date: </b>{formatDate(receipt.date)}
                        <br />
                        <b>Amount: </b>{receipt.amount} €
                        <br />
                        <b>Status: </b><span className="status">{receipt.status}</span>

                        <div className="button-container">
                            {user!.type == "salesperson" && (receipt.status === "new" || receipt.status === "verified") && (
                                <button
                                    className="delete-button"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                            )}
                            
                            {user!.type === "accountant" && receipt.status === "new" && (
                                <>
                                <div className="button-row">
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
                                </div>
                                <div className="button-row">
                                    <button className="verify-button" type="submit" onClick={handleFetch}>
                                        Verify payments
                                    </button>
                                </div>
                                </>
                            )}
                            
                            {user!.type === "manager" && receipt.status === "verified" && (
                                <div className="button-row">
                                    <button
                                        className="valid-button"
                                        onClick={() => {
                                            if (receipt) approveReceipt(receipt.id, user!.email);
                                            alert("Receipt Approved!");
                                            navigate("/dashboard");
                                        }}
                                    >
                                        Approve
                                    </button>

                                    <button
                                        className="not-valid-button"
                                        onClick={() => {
                                            if (receipt) rejectReceipt(receipt.id, user!.email);
                                            alert("Manager rejected the receipt!");
                                            navigate("/dashboard");
                                        }}
                                    >
                                        Don't Approve
                                    </button>
                                </div>
                            )}

                            {user!.type === "accountant" && payments && payments.length > 0 && (
                                <div className="payments-sidebar">
                                    <div className="information-card">
                                        <h4>Payments for {receipt.salesperson.firstname}</h4>
                                        <ul>
                                            {payments.map((p: BankPayment) => (
                                                <li key={p.id}>
                                                    <p>Id: {p.id}</p>
                                                    <p>
                                                        Amount:{" "}
                                                        {p.attributes.amount}
                                                    </p>
                                                    <p>
                                                        Status:{" "}
                                                        {p.attributes.status}
                                                    </p>

                                                    <button
                                                        onClick={() => {
                                                            api.markPayment(
                                                                p.id,
                                                                "approved"
                                                            );
                                                            handleFetch();
                                                        }}
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            api.markPayment(
                                                                p.id,
                                                                "fraud"
                                                            );
                                                            handleFetch();
                                                        }}
                                                    >
                                                        Fraud
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
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