import { describe, it, expect, vi, beforeEach } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";
import SalespersonHistory from "./SalespersonHistory";
import * as AuthContext from "../Authentication/AuthContext";
import * as receiptModel from "../model/receipt";
import * as utils from "../utils";
import type { Receipt } from "../model/receipt";
import type { User } from "../model/user";

// Mock des modules

vi.mock("../utils", () => ({
    formatDate: vi.fn((date: Date) => {
        return date.toLocaleDateString("fr-FR");
    }),
}));

const mockUser: User = {
    email: "salesperson@test.com",
    type: "salesperson",
    firstname: "John",
    lastname: "Doe",
    groupId: 1,
};

const mockReceipts: Receipt[] = [
    {
        id: "1",
        salesperson: mockUser,
        title: "Receipt 1",
        subject: "Business lunch",
        date: new Date("2024-01-15"),
        amount: 50.0,
        status: "approved",
        image: "blob:receipt1",
    },
    {
        id: "2",
        salesperson: mockUser,
        title: "Receipt 2",
        subject: "Office supplies",
        date: new Date("2024-01-20"),
        amount: 75.5,
        status: "rejected",
        image: "blob:receipt2",
    },
    {
        id: "3",
        salesperson: mockUser,
        title: "Receipt 3",
        subject: "Client meeting",
        date: new Date("2024-01-25"),
        amount: 120.0,
        status: "new",
        image: "blob:receipt3",
    },
];

vi.mock("../Authentication/AuthContext", async () => {
    const actual = await vi.importActual("../Authentication/AuthContext");
    return {
        ...actual,
        useUserOnlyPage: vi.fn(),
    };
});

beforeEach(() => {
    vi.clearAllMocks();
    cleanup();

    vi.mock("../model/receipt", () => ({
        getReceiptsForUser: vi.fn(),
    }));
});

const renderWithRouter = (component: React.ReactElement) => {
    vi.spyOn(AuthContext, "useAuth").mockReturnValue({
        user: mockUser,
        login: vi.fn(),
        register: vi.fn(),
        logout: vi.fn(),
    });
    return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("SalespersonHistory Component", () => {
    it("render title of component", () => {
        vi.spyOn(receiptModel, "getReceiptsForUser").mockReturnValue(
            mockReceipts
        );

        renderWithRouter(<SalespersonHistory />);

        expect(screen.getByText("Submit History")).toBeInTheDocument();
    });

    it("call getReceiptForUser with mail", async () => {
        const getReceiptsForUserSpy = vi
            .spyOn(receiptModel, "getReceiptsForUser")
            .mockReturnValue(mockReceipts);

        renderWithRouter(<SalespersonHistory />);

        await waitFor(() => {
            expect(getReceiptsForUserSpy).toHaveBeenCalledWith(
                "salesperson@test.com"
            );
            expect(getReceiptsForUserSpy).toHaveBeenCalledOnce();
        });
    });

    it("render all receipts", () => {
        vi.spyOn(receiptModel, "getReceiptsForUser").mockReturnValue(
            mockReceipts
        );

        renderWithRouter(<SalespersonHistory />);

        expect(screen.getByText(/Receipt 1/)).toBeInTheDocument();
        expect(screen.getByText(/Receipt 2/)).toBeInTheDocument();
        expect(screen.getByText(/Receipt 3/)).toBeInTheDocument();
    });

    it("render formatted dates with formatDate", () => {
        vi.spyOn(receiptModel, "getReceiptsForUser").mockReturnValue(
            mockReceipts
        );
        const formatDateSpy = vi.spyOn(utils, "formatDate");

        renderWithRouter(<SalespersonHistory />);

        expect(formatDateSpy).toHaveBeenCalledTimes(3);
        expect(formatDateSpy).toHaveBeenCalledWith(mockReceipts[0].date);
        expect(formatDateSpy).toHaveBeenCalledWith(mockReceipts[1].date);
        expect(formatDateSpy).toHaveBeenCalledWith(mockReceipts[2].date);
    });

    it("render approved icon for approved receipts", () => {
        vi.spyOn(receiptModel, "getReceiptsForUser").mockReturnValue([
            mockReceipts[0],
        ]);

        renderWithRouter(<SalespersonHistory />);

        const acceptedIcons = screen.getAllByTestId("accepted-icon");
        expect(acceptedIcons).toHaveLength(1);
        expect(screen.queryByTestId("rejected-icon")).not.toBeInTheDocument();
    });

    it("render rejected icon for rejected receipts", () => {
        vi.spyOn(receiptModel, "getReceiptsForUser").mockReturnValue([
            mockReceipts[1],
        ]);

        renderWithRouter(<SalespersonHistory />);

        const rejectedIcons = screen.getAllByTestId("rejected-icon");
        expect(rejectedIcons).toHaveLength(1);
        expect(screen.queryByTestId("accepted-icon")).not.toBeInTheDocument();
    });

    it("render non approved for non approved receipts", () => {
        vi.spyOn(receiptModel, "getReceiptsForUser").mockReturnValue([
            mockReceipts[2],
        ]);

        renderWithRouter(<SalespersonHistory />);

        const rejectedIcons = screen.getAllByTestId("rejected-icon");
        expect(rejectedIcons).toHaveLength(1);
    });

    it("render rejected items with good class", () => {
        vi.spyOn(receiptModel, "getReceiptsForUser").mockReturnValue(
            mockReceipts
        );

        const { container } = renderWithRouter(<SalespersonHistory />);

        const rejectedItems = container.querySelectorAll(
            ".notification-item.rejected"
        );
        expect(rejectedItems).toHaveLength(1);
    });

    it("render links to /receipt/{id}", () => {
        vi.spyOn(receiptModel, "getReceiptsForUser").mockReturnValue(
            mockReceipts
        );

        renderWithRouter(<SalespersonHistory />);

        const links = screen.getAllByTestId("notification-link");
        expect(links).toHaveLength(3);
        expect(links[0]).toHaveAttribute("href", "/receipt/1");
        expect(links[1]).toHaveAttribute("href", "/receipt/2");
        expect(links[2]).toHaveAttribute("href", "/receipt/3");
    });

    it("render empty message when no receipts", () => {
        vi.spyOn(receiptModel, "getReceiptsForUser").mockReturnValue([]);

        renderWithRouter(<SalespersonHistory />);

        const links = screen.queryAllByTestId("notification-link");
        expect(links).toHaveLength(0);
    });

    // it("devrait mettre à jour les reçus si l'utilisateur change", () => {
    //     const getReceiptsForUserSpy = vi
    //         .spyOn(receiptModel, "getReceiptsForUser")
    //         .mockReturnValue([mockReceipts[0]]);

    //     const { rerender } = renderWithRouter(<SalespersonHistory />);

    //     expect(getReceiptsForUserSpy).toHaveBeenCalledWith(
    //         "salesperson@test.com"
    //     );

    //     // Simuler un changement d'utilisateur
    //     const newUser: User = {
    //         email: "newsales@test.com",
    //         type: "salesperson",
    //         firstname: "Jane",
    //         lastname: "Smith",
    //         groupId: 1,
    //     };

    //     vi.spyOn(AuthContext, "useAuth").mockReturnValue({
    //         user: newUser,
    //         login: vi.fn(),
    //         register: vi.fn(),
    //         logout: vi.fn(),
    //     });

    //     getReceiptsForUserSpy.mockReturnValue([mockReceipts[1]]);

    //     rerender(
    //         <BrowserRouter>
    //             <SalespersonHistory />
    //         </BrowserRouter>
    //     );

    //     expect(getReceiptsForUserSpy).toHaveBeenCalledWith("newsales@test.com");
    // });

    it("render date and title together", () => {
        vi.spyOn(receiptModel, "getReceiptsForUser").mockReturnValue([
            mockReceipts[0],
        ]);
        vi.spyOn(utils, "formatDate").mockReturnValue("15/01/2024");

        renderWithRouter(<SalespersonHistory />);

        expect(
            screen.getByText(/15\/01\/2024 – Receipt 1/)
        ).toBeInTheDocument();
    });
});
