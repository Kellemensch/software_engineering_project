import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("uuid", () => ({
    v4: () => "mocked-uuid",
}));

vi.mock("./logs", () => ({
    log: vi.fn(),
}));

vi.mock("./user", () => ({
    getUserData: vi.fn((email: string) => ({
        email,
        type: email.includes("acc") ? "accountant" : "salesperson",
        firstname: "John",
        lastname: "Doe",
        groupId: 1,
    })),
}));

let receiptModel: typeof import("./receipt");

beforeEach(async () => {
    localStorage.clear();
    vi.resetModules();
    receiptModel = await import("./receipt");
});

describe("receipt model", () => {
    it("should start with empty storage", () => {
        expect(receiptModel.getReceipts()).toEqual([]);
    });

    it("should create a receipt", () => {
        const id = receiptModel.createReceipt({
            email: "salesperson@test.com",
            title: "Title",
            subject: "Subject",
            date: new Date(),
            amount: 100,
            image: "img",
        });

        expect(id).toBe("mocked-uuid");
        const receipts = receiptModel.getReceipts();
        expect(receipts).toHaveLength(1);
        expect(receipts[0].title).toBe("Title");
        expect(receipts[0].status).toBe("new");
    });

    it("should filter receipts by user", () => {
        receiptModel.setReceipts([
            {
                id: "1",
                title: "Receipt 1",
                subject: "Subject 1",
                date: new Date(),
                amount: 10,
                image: "",
                status: "new",
                salesperson: {
                    email: "salesperson1@test.com",
                    type: "salesperson",
                    firstname: "John",
                    lastname: "Doe",
                    groupId: 1,
                },
            },
            {
                id: "2",
                title: "Receipt 2",
                subject: "Subject 2",
                date: new Date(),
                amount: 20,
                image: "",
                status: "new",
                salesperson: {
                    email: "salesperson2@test.com",
                    type: "salesperson",
                    firstname: "John",
                    lastname: "Doe",
                    groupId: 1,
                },
            },
        ]);

        const result = receiptModel.getReceiptsForUser("salesperson1@test.com");
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe("1");
    });

    it("should approve a receipt only if user is accountant", () => {
        receiptModel.setReceipts([
            {
                id: "1",
                title: "Receipt 1",
                subject: "Subject 1",
                date: new Date(),
                amount: 10,
                image: "",
                status: "new",
                salesperson: {
                    email: "salesperson1@test.com",
                    type: "salesperson",
                    firstname: "John",
                    lastname: "Doe",
                    groupId: 1,
                },
            },
        ]);

        const ok = receiptModel.approveReceipt("1", "accountant@test.com");
        expect(ok).toBe(true);
        expect(receiptModel.getReceipts()[0].status).toBe("approved");
    });

    it("should reject a receipt only if user is accountant", () => {
        receiptModel.setReceipts([
            {
                id: "1",
                title: "Receipt 1",
                subject: "Subject 1",
                date: new Date(),
                amount: 10,
                image: "",
                status: "new",
                salesperson: {
                    email: "salesperson1@test.com",
                    type: "salesperson",
                    firstname: "John",
                    lastname: "Doe",
                    groupId: 1,
                },
            },
        ]);

        const no = receiptModel.rejectReceipt("1", "salesperson1@test.com");
        expect(no).toBe(false);

        const ok = receiptModel.rejectReceipt("1", "accountant@test.com");
        expect(ok).toBe(true);
        expect(receiptModel.getReceipts()[0].status).toBe("rejected");
    });

    it("should delete a receipt", () => {
        receiptModel.setReceipts([
            {
                id: "1",
                title: "Receipt 1",
                subject: "Subject 1",
                date: new Date(),
                amount: 10,
                image: "",
                status: "new",
                salesperson: {
                    email: "salesperson1@test.com",
                    type: "salesperson",
                    firstname: "John",
                    lastname: "Doe",
                    groupId: 1,
                },
            },
        ]);

        receiptModel.deleteReceipt("1");
        expect(receiptModel.getReceipts()).toHaveLength(0);
    });
});
