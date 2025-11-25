import { getUserData, type User } from "./user";
import { v4 as uuidv4 } from "uuid";

export interface Receipt {
    salesperson: User;

    id: string;
    title: string;
    subject: string;
    date: Date;
    amount: number;
    status: "new" | "verified" | "rejected" | "approved" | "reimbursed";

    image: File;
}

let receipts: Receipt[] = [];

export function getReceipts() {
    return receipts;
}

export function getReceiptsForUser(email: string) {
    return receipts.filter((r) => r.salesperson.email == email);
}

export function createReceipt(data: {
    email: string;
    title: string;
    subject: string;
    date: Date;
    amount: number;
    image: File;
}) {
    const id = uuidv4();

    const receipt: Receipt = {
        salesperson: getUserData(data.email)!,
        title: data.title,
        subject: data.subject,
        date: data.date,
        amount: data.amount,
        image: data.image,
        status: "new",
        id,
    };

    receipts.push(receipt);
    return id;
}

export function approveReceipt(id: string, accountantEmail: string) {
    // check the approver is an accountant
    const approver = getUserData(accountantEmail);
    if (approver?.type !== "accountant") return false;

    const receipt = receipts.find((r) => r.id === id)!;
    receipt.status = "approved";
    return true;
}

export function rejectReceipt(id: string, accountantEmail: string) {
    // check the approver is an accountant
    const approver = getUserData(accountantEmail);
    if (approver?.type !== "accountant") return false;

    const receipt = receipts.find((r) => r.id === id)!;
    receipt.status = "rejected";
    return true;
}

export function getReceipt(id: string) {
    return receipts.find((r) => r.id === id);
}

export function deleteReceipt(id: string) {
    receipts = receipts.filter((r) => r.id !== id);
}
