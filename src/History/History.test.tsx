import { describe, it, expect, vi, beforeEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";
import History from "./History";
import * as AuthContext from "../Authentication/AuthContext";
import type { User } from "../model/user";

// Composents mocks
vi.mock("./SalespersonHistory", () => ({
    default: () => (
        <div data-testid="salesperson-history">Salesperson History</div>
    ),
}));

vi.mock("./AccountantHistory", () => ({
    default: () => (
        <div data-testid="accountant-history">Accountant History</div>
    ),
}));

vi.mock("./ManagerHistory", () => ({
    default: () => <div data-testid="manager-history">Manager History</div>,
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

describe("History Component", () => {
    it("render salesperson view", () => {
        renderWithRouter(<History />, mockSaleman);

        expect(screen.getByTestId("salesperson-history")).toBeInTheDocument();
        expect(
            screen.queryByTestId("accountant-history")
        ).not.toBeInTheDocument();
        expect(screen.queryByTestId("manager-history")).not.toBeInTheDocument();
    });

    it("render accountant view", () => {
        renderWithRouter(<History />, mockAccountant);

        expect(screen.getByTestId("accountant-history")).toBeInTheDocument();
        expect(
            screen.queryByTestId("salesperson-history")
        ).not.toBeInTheDocument();
        expect(screen.queryByTestId("manager-history")).not.toBeInTheDocument();
    });

    it("render manager view", () => {
        renderWithRouter(<History />, mockManager);

        expect(screen.getByTestId("manager-history")).toBeInTheDocument();
        expect(
            screen.queryByTestId("salesperson-history")
        ).not.toBeInTheDocument();
        expect(
            screen.queryByTestId("accountant-history")
        ).not.toBeInTheDocument();
    });

    it("render null for invalid user", () => {
        const { container } = renderWithRouter(<History />, mockInvalid);

        expect(container.firstChild).toBeNull();
    });

    it("call useUserOnlyPage", () => {
        const useUserOnlyPageSpy = vi.spyOn(AuthContext, "useUserOnlyPage");

        renderWithRouter(<History />, mockSaleman);

        expect(useUserOnlyPageSpy).toHaveBeenCalledOnce();
    });
});
