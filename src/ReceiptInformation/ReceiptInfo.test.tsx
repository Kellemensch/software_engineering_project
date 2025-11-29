import { describe, it, expect, vi, beforeEach } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";
import * as AuthContext from "../Authentication/AuthContext";
import * as receiptModel from "../model/receipt";
import * as utils from "../utils";
import type { Receipt } from "../model/receipt";
import type { User } from "../model/user";
import ReceiptInfo from "./ReceiptInfo";
import userEvent from "@testing-library/user-event";

vi.mock("../utils", () => ({
    formatDate: vi.fn((date: Date) => {
        return date.toLocaleDateString("fr-FR");
    }),
}));

const mockSaleman: User = {
    email: "salesperson@test.com",
    type: "salesperson",
    firstname: "John",
    lastname: "Doe",
    groupId: 1,
};
const mockAccountant: User = {
    email: "accountant@test.com",
    type: "accountant",
    firstname: "John",
    lastname: "Doe",
    groupId: 1,
};
const mockManager: User = {
    email: "manager@test.com",
    type: "manager",
    firstname: "John",
    lastname: "Doe",
    groupId: 1,
};

const mockReceipt: Receipt = {
    id: "1",
    salesperson: mockSaleman,
    title: "Receipt 1",
    subject: "Client meeting",
    date: new Date("2024-01-25"),
    amount: 75.5,
    status: "new",
    image: "blob:receipt1",
};

vi.mock("../Authentication/AuthContext", async () => {
    const actual = await vi.importActual("../Authentication/AuthContext");
    return {
        ...actual,
        useUserOnlyPage: vi.fn(),
    };
});

const mockNavigate = vi.fn();
const mockAlert = vi.fn();

vi.stubGlobal("alert", mockAlert);

beforeEach(() => {
    vi.clearAllMocks();
    cleanup();

    vi.mock("react-router-dom", async () => {
        const actual = await vi.importActual<typeof import("react-router-dom")>(
            "react-router-dom"
        );

        return {
            ...actual,
            useNavigate: () => mockNavigate,
            useParams: () => ({ receiptId: "1" }),
        };
    });

    vi.mock("../model/receipt", () => ({
        getReceipt: vi.fn(),
        deleteReceipt: vi.fn(),
        approveReceipt: vi.fn(),
        rejectReceipt: vi.fn(),
    }));
});

const renderWithRouter = (component: React.ReactElement, user: User) => {
    vi.spyOn(AuthContext, "useAuth").mockReturnValue({
        user,
        login: vi.fn(),
        register: vi.fn(),
        logout: vi.fn(),
    });
    return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("ReceiptInfo Component", () => {
    it('render Loading state during loading"', () => {
        vi.spyOn(receiptModel, "getReceipt").mockReturnValue(undefined);
        renderWithRouter(<ReceiptInfo />, mockSaleman);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("render and display receipt", async () => {
        vi.spyOn(receiptModel, "getReceipt").mockReturnValue(mockReceipt);
        renderWithRouter(<ReceiptInfo />, mockSaleman);

        await waitFor(() => {
            expect(screen.getByText("Receipt 1")).toBeInTheDocument();
            expect(screen.getByText("Client meeting")).toBeInTheDocument();
            expect(screen.getByText("75.5 €")).toBeInTheDocument();
            expect(screen.getByText("new")).toBeInTheDocument();
        });
    });

    it("render alert and navigates to dashboard", async () => {
        vi.spyOn(receiptModel, "getReceipt").mockReturnValue(null);
        renderWithRouter(<ReceiptInfo />, mockSaleman);

        await waitFor(() => {
            expect(mockAlert).toHaveBeenCalledWith(
                "Receipt not found. Redirecting to dashboard..."
            );
            expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
        });
    });

    it("format date with formatDate", () => {
        vi.spyOn(receiptModel, "getReceipt").mockReturnValue(mockReceipt);
        const formatDateSpy = vi.spyOn(utils, "formatDate");

        renderWithRouter(<ReceiptInfo />, mockSaleman);

        expect(formatDateSpy).toHaveBeenCalledWith(mockReceipt.date);
    });

    it("render receipt image", () => {
        vi.spyOn(receiptModel, "getReceipt").mockReturnValue(mockReceipt);

        renderWithRouter(<ReceiptInfo />, mockSaleman);

        const image = screen.getByAltText("Receipt");
        expect(image).toHaveAttribute("src", "blob:receipt1");
    });

    describe("Salesperson view", () => {
        it('render "Delete" button', () => {
            vi.spyOn(receiptModel, "getReceipt").mockReturnValue(mockReceipt);

            renderWithRouter(<ReceiptInfo />, mockSaleman);

            expect(screen.getByText("Delete")).toBeInTheDocument();
            expect(screen.queryByText("Valid")).not.toBeInTheDocument();
            expect(screen.queryByText("Not Valid")).not.toBeInTheDocument();
        });

        it("Delete receipt when clicking the button", async () => {
            const user = userEvent.setup();
            vi.spyOn(receiptModel, "getReceipt").mockReturnValue(mockReceipt);
            const deleteReceiptSpy = vi
                .spyOn(receiptModel, "deleteReceipt")
                .mockResolvedValue();

            renderWithRouter(<ReceiptInfo />, mockSaleman);

            const deleteButton = screen.getByText("Delete");
            await user.click(deleteButton);

            expect(deleteReceiptSpy).toHaveBeenCalledWith("1");
            expect(mockAlert).toHaveBeenCalledWith(
                "Deleted! Redirecting to dashboard..."
            );
            expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
        });
    });

    describe("Accountant view", () => {
        it("render buttons for accountant", () => {
            vi.spyOn(receiptModel, "getReceipt").mockReturnValue(mockReceipt);

            renderWithRouter(<ReceiptInfo />, mockAccountant);

            expect(screen.getByText("Valid")).toBeInTheDocument();
            expect(screen.getByText("Not Valid")).toBeInTheDocument();
            expect(screen.getByText("Verify payments")).toBeInTheDocument();
            expect(screen.queryByText("Delete")).not.toBeInTheDocument();
        });

        it("Approve receipt when clicking the button", async () => {
            const user = userEvent.setup();
            vi.spyOn(receiptModel, "getReceipt").mockReturnValue(mockReceipt);
            const approveReceiptSpy = vi.spyOn(receiptModel, "approveReceipt");

            renderWithRouter(<ReceiptInfo />, mockAccountant);

            const validButton = screen.getByText("Valid");
            await user.click(validButton);

            expect(approveReceiptSpy).toHaveBeenCalledWith(
                "1",
                "accountant@test.com"
            );
            expect(mockAlert).toHaveBeenCalledWith(
                "Approved! Redirecting to dashboard"
            );
            expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
        });

        it("Reject receipt when clicking the button", async () => {
            const user = userEvent.setup();
            vi.spyOn(receiptModel, "getReceipt").mockReturnValue(mockReceipt);
            const rejectReceiptSpy = vi.spyOn(receiptModel, "rejectReceipt");

            renderWithRouter(<ReceiptInfo />, mockAccountant);

            const rejectButton = screen.getByText("Not Valid");
            await user.click(rejectButton);

            expect(rejectReceiptSpy).toHaveBeenCalledWith(
                "1",
                "accountant@test.com"
            );
            expect(mockAlert).toHaveBeenCalledWith(
                "Rejected! Redirecting to dashboard"
            );
            expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
        });
    });

    describe("Manager view", () => {
        it("render manager view", () => {
            vi.spyOn(receiptModel, "getReceipt").mockReturnValue(mockReceipt);

            renderWithRouter(<ReceiptInfo />, mockManager);

            expect(
                screen.getByText("no buttons yet for the manager view")
            ).toBeInTheDocument();
            expect(screen.queryByText("Delete")).not.toBeInTheDocument();
            expect(screen.queryByText("Valid")).not.toBeInTheDocument();
        });
    });
});
