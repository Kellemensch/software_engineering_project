import { describe, it, expect, vi, beforeEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import Login from "./Login";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router";

vi.mock("./AuthContext", async () => {
    const actual = await vi.importActual("./AuthContext");
    return {
        ...actual,
        useAuth: vi.fn(),
    };
});

vi.mock("react-router", async () => {
    const actual = await vi.importActual("react-router");
    return {
        ...actual,
        useNavigate: vi.fn(),
        Link: ({ to, children }: any) => <a href={to}>{children}</a>,
    };
});

const mockLogin = vi.fn();
const mockNavigate = vi.fn();

beforeEach(() => {
    vi.clearAllMocks();
    cleanup();

    (useAuth as any).mockReturnValue({
        login: mockLogin,
    });

    (useNavigate as any).mockReturnValue(mockNavigate);
});

describe("Login component", () => {
    it("connect through form", async () => {
        const user = userEvent.setup();

        mockLogin.mockReturnValue(true);

        render(<Login />);

        const emailInput = screen.getByPlaceholderText("Mail");
        const pwdInput = screen.getByPlaceholderText("Password");
        const submitBtn = screen.getByText("Submit");

        await user.type(emailInput, "john@example.com");
        await user.type(pwdInput, "secret");
        await user.click(submitBtn);

        expect(mockLogin).toHaveBeenCalledWith("john@example.com", "secret");
        expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });

    it("render error when login error", async () => {
        const user = userEvent.setup();

        mockLogin.mockReturnValue(false);

        render(<Login />);

        const emailInput = screen.getByPlaceholderText("Mail");
        const pwdInput = screen.getByPlaceholderText("Password");
        const submitBtn = screen.getByText("Submit");

        await user.type(emailInput, "wrong@example.com");
        await user.type(pwdInput, "badpass");
        await user.click(submitBtn);

        expect(mockLogin).toHaveBeenCalledWith("wrong@example.com", "badpass");
        expect(screen.getByText("An error occured")).toBeInTheDocument();
        expect(mockNavigate).not.toHaveBeenCalled();
    });

    it("autoLogin salesperson", async () => {
        const user = userEvent.setup();

        render(<Login />);

        const btn = screen.getByText("Login as default Salesperson");
        await user.click(btn);

        expect(mockLogin).toHaveBeenCalledWith(
            "salesperson@example.com",
            "changeme"
        );
        expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });

    it("autoLogin accountant", async () => {
        const user = userEvent.setup();

        render(<Login />);

        const btn = screen.getByText("Login as default Accountant");
        await user.click(btn);

        expect(mockLogin).toHaveBeenCalledWith(
            "accountant@example.com",
            "password"
        );
        expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });

    it("autoLogin manager", async () => {
        const user = userEvent.setup();

        render(<Login />);

        const btn = screen.getByText("Login as default Manager");
        await user.click(btn);

        expect(mockLogin).toHaveBeenCalledWith(
            "manager@example.com",
            "DonkeyKong"
        );
        expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
});
