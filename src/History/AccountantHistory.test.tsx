import { describe, it, expect, vi, beforeEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";
import * as AuthContext from "../Authentication/AuthContext";
import * as receiptModel from "../model/receipt";
import * as utils from "../utils";
import type { Receipt } from "../model/receipt";
import type { User } from "../model/user";
import AccountantHistory from "./AccountantHistory";

vi.mock("../model/receipt", () => ({
    getReceiptsForGroup: vi.fn(),
}));

vi.mock("../utils", () => ({
    formatDate: vi.fn((date: Date) => {
        return date.toLocaleDateString("fr-FR");
    }),
}));

const mockSalesman: User = {
    email: "salesman@test.com",
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

const mockReceipts: Receipt[] = [
    {
        id: "1",
        salesperson: mockSalesman,
        title: "Receipt 1",
        subject: "Business lunch",
        date: new Date("2024-01-15"),
        amount: 50.0,
        status: "approved",
        image: "blob:receipt1",
    },
    {
        id: "2",
        salesperson: mockSalesman,
        title: "Receipt 2",
        subject: "Office supplies",
        date: new Date("2024-01-20"),
        amount: 75.5,
        status: "rejected",
        image: "blob:receipt2",
    },
    {
        id: "3",
        salesperson: mockSalesman,
        title: "Receipt 3",
        subject: "Client meeting",
        date: new Date("2024-01-25"),
        amount: 120.0,
        status: "new",
        image: "blob:receipt3",
    },
];

beforeEach(() => {
    vi.clearAllMocks();
    cleanup();

    vi.spyOn(AuthContext, "useAuth").mockReturnValue({
        user: mockAccountant,
        login: vi.fn(),
        register: vi.fn(),
        logout: vi.fn(),
    });
});

const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("AccountantHistory Component", () => {
    it("render title of component", () => {
        vi.spyOn(receiptModel, "getReceiptsForGroup").mockReturnValue([]);

        renderWithRouter(<AccountantHistory />);

        expect(screen.getByText("Review History")).toBeInTheDocument();
    });

    it("call getReceiptsForGroup with the group id", () => {
        const getReceiptsForGroupSpy = vi
            .spyOn(receiptModel, "getReceiptsForGroup")
            .mockReturnValue([]);

        renderWithRouter(<AccountantHistory />);

        expect(getReceiptsForGroupSpy).toHaveBeenCalledWith(1);
        expect(getReceiptsForGroupSpy).toHaveBeenCalledOnce();
    });

    it("render all receipts", () => {
        vi.spyOn(receiptModel, "getReceiptsForGroup").mockReturnValue(
            mockReceipts
        );

        renderWithRouter(<AccountantHistory />);

        expect(screen.getByText(/Receipt 1/)).toBeInTheDocument();
        expect(screen.getByText(/Receipt 2/)).toBeInTheDocument();
        expect(screen.getByText(/Receipt 3/)).toBeInTheDocument();
    });

    it("render dates formated with formatDate", () => {
        vi.spyOn(receiptModel, "getReceiptsForGroup").mockReturnValue(
            mockReceipts
        );
        const formatDateSpy = vi.spyOn(utils, "formatDate");

        renderWithRouter(<AccountantHistory />);

        expect(formatDateSpy).toHaveBeenCalledTimes(3);
        expect(formatDateSpy).toHaveBeenCalledWith(mockReceipts[0].date);
        expect(formatDateSpy).toHaveBeenCalledWith(mockReceipts[1].date);
        expect(formatDateSpy).toHaveBeenCalledWith(mockReceipts[2].date);
    });

    it("render icon for accepted receipts", () => {
        vi.spyOn(receiptModel, "getReceiptsForGroup").mockReturnValue([
            mockReceipts[0],
        ]);

        renderWithRouter(<AccountantHistory />);

        const acceptedIcons = screen.getAllByTestId("accepted-icon");
        expect(acceptedIcons).toHaveLength(1);
        expect(screen.queryByTestId("rejected-icon")).not.toBeInTheDocument();
    });

    it("render rejected items with good class", () => {
        vi.spyOn(receiptModel, "getReceiptsForGroup").mockReturnValue(
            mockReceipts
        );

        const { container } = renderWithRouter(<AccountantHistory />);

        const rejectedItems = container.querySelectorAll(
            ".notification-item.rejected"
        );
        expect(rejectedItems).toHaveLength(1);
    });

    it("render empty message when no receipts", () => {
        vi.spyOn(receiptModel, "getReceiptsForGroup").mockReturnValue([]);

        renderWithRouter(<AccountantHistory />);

        const links = screen.queryAllByTestId("notification-link");
        expect(links).toHaveLength(0);
    });

    it("render date and title together", () => {
        vi.spyOn(receiptModel, "getReceiptsForGroup").mockReturnValue([
            mockReceipts[0],
        ]);
        vi.spyOn(utils, "formatDate").mockReturnValue("15/01/2024");

        renderWithRouter(<AccountantHistory />);

        expect(screen.getByText(/15\/01\/2024 Receipt 1/)).toBeInTheDocument();
    });
});
