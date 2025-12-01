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
    // console.log("[DEBUG] ReceiptInfo useParams:", receiptId);
    const navigate = useNavigate();

    useEffect(() => {
        const receipt = getReceipt(receiptId!);
        // console.log("[DEBUG] ReceiptInfo getReceipt:", receipt);
        if (!receipt) {
            alert("Receipt not found. Redirecting to dashboard...");
            navigate("/dashboard");
            return;
        }
        setReceipt(getReceipt(receiptId!));
    }, [receiptId]);

    function handleDelete() {
        if (receipt) deleteReceipt(receipt.id);
        alert("Succesfully Deleted!");
        navigate("/dashboard");
    }

    function handleValidate() {
        if (receipt) approveReceipt(receipt.id, user!.email);
        alert("Successfully Validated!");
        navigate("/dashboard");
    }
    function handleReject() {
        if (receipt) rejectReceipt(receipt.id, user!.email);
        alert("Successfully Rejected!");
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
                            {user!.type === "manager" && (
                                <p>no buttons yet for the manager view</p>
                            )}

                            {user!.type === "accountant" && payments && (
                                <div className="payments-sidebar">
                                    <div className="information-card">
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
