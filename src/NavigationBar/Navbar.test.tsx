import { describe, it, expect, vi, beforeEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";
import * as AuthContext from "../Authentication/AuthContext";
import type { User } from "../model/user";
import Navbar from "./Navbar";

// Composents mocks
vi.mock("./SalespersonNavbar", () => ({
    default: () => (
        <div data-testid="salesperson-navbar">Salesperson Navbar</div>
    ),
}));

vi.mock("./AccountantNavbar", () => ({
    default: () => <div data-testid="accountant-navbar">Accountant Navbar</div>,
}));

vi.mock("./ManagerNavbar", () => ({
    default: () => <div data-testid="manager-navbar">Manager Navbar</div>,
}));

vi.mock("../Authentication/AuthContext", async () => {
    const actual = await vi.importActual("../Authentication/AuthContext");
    return {
        ...actual,
        useUserOnlyPage: vi.fn(),
    };
});

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
const mockInvalid: User = {
    email: "invalid@test.com",
    type: "invalid" as any,
    firstname: "John",
    lastname: "Doe",
    groupId: 1,
};

beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
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

describe("Navbar Component", () => {
    it("render salesperson navbar", () => {
        renderWithRouter(<Navbar />, mockSaleman);

        expect(screen.getByTestId("salesperson-navbar")).toBeInTheDocument();
        expect(
            screen.queryByTestId("accountant-navbar")
        ).not.toBeInTheDocument();
        expect(screen.queryByTestId("manager-navbar")).not.toBeInTheDocument();
    });

    it("render accountant navbar", () => {
        renderWithRouter(<Navbar />, mockAccountant);

        expect(screen.getByTestId("accountant-navbar")).toBeInTheDocument();
        expect(
            screen.queryByTestId("salesperson-navbar")
        ).not.toBeInTheDocument();
        expect(screen.queryByTestId("manager-navbar")).not.toBeInTheDocument();
    });

    it("render manager navbar", () => {
        renderWithRouter(<Navbar />, mockManager);

        expect(screen.getByTestId("manager-navbar")).toBeInTheDocument();
        expect(
            screen.queryByTestId("salesperson-navbar")
        ).not.toBeInTheDocument();
        expect(
            screen.queryByTestId("accountant-navbar")
        ).not.toBeInTheDocument();
    });

    it("render null for invalid user", () => {
        const { container } = renderWithRouter(<Navbar />, mockInvalid);

        expect(container.firstChild).toBeNull();
    });
});
