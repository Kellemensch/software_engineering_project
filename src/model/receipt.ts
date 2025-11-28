import { log } from "./logs";
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

    image: string; // stored as an object URL
}

let receipts: Receipt[] = loadReceiptsFromLocalStorage();

function loadReceiptsFromLocalStorage() {
    const loaded = JSON.parse(localStorage.getItem("receipts") ?? "[]");
    return loaded.map((data: any) => {
        return {
            ...data,
            date: new Date(Date.parse(data.date)),
        };
    });
}

export function setReceipts(r: Receipt[]) {
    receipts = r;
    localStorage.setItem("receipts", JSON.stringify(receipts));
}

export function getReceipts() {
    return receipts;
}

export function getReceiptsForUser(email: string) {
    return receipts.filter((r) => r.salesperson.email == email);
}

export function getReceiptsForGroup(groupId: number) {
    return receipts.filter((r) => r.salesperson.groupId == groupId);
}

export function createReceipt(data: {
    email: string;
    title: string;
    subject: string;
    date: Date;
    amount: number;
    image: string;
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

    log(`Receipt created by ${data.email} : ${JSON.stringify(receipt)}`);

    setReceipts([...receipts, receipt]);
    return id;
}

export function approveReceipt(id: string, accountantEmail: string) {
    // check the approver is an accountant
    const approver = getUserData(accountantEmail);
    if (approver?.type !== "accountant") return false;

    log(`Receipt ${id} approved by ${accountantEmail}`);

    setReceipts(
        receipts.map((r) => {
            if (r.id === id) r.status = "approved";
            return r;
        }),
    );
    return true;
}

export function rejectReceipt(id: string, accountantEmail: string) {
    // check the approver is an accountant
    const approver = getUserData(accountantEmail);
    if (approver?.type !== "accountant") return false;

    log(`Receipt ${id} rejected by ${accountantEmail}`);

    setReceipts(
        receipts.map((r) => {
            if (r.id === id) r.status = "rejected";
            return r;
        }),
    );
    return true;
}

export function getReceipt(id: string) {
    return receipts.find((r) => r.id === id);
}

export function deleteReceipt(id: string) {
    log(`Receipt ${id} deleted.`);
    setReceipts(receipts.filter((r) => r.id !== id));
}
