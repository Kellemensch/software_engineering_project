import { describe, it, expect, vi, beforeEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import Register from "./Register";
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
        Link: ({ to, children }: any) => <a href={to}>{children}</a>, // simplification Link
    };
});

const mockRegister = vi.fn();
const mockNavigate = vi.fn();

beforeEach(() => {
    vi.clearAllMocks();
    cleanup();

    (useAuth as any).mockReturnValue({
        register: mockRegister,
    });

    (useNavigate as any).mockReturnValue(mockNavigate);
});

describe("Register component", () => {
    it("send form and submit with good inputs", async () => {
        const user = userEvent.setup();

        render(<Register />);

        const first = screen.getByPlaceholderText("Name");
        const last = screen.getByPlaceholderText("Last Name");
        const email = screen.getByPlaceholderText("Email");
        const phone = screen.getByPlaceholderText("Phone Number");
        const pwd = screen.getByPlaceholderText("Password");
        const submit = screen.getByText("Submit");

        await user.type(first, "John");
        await user.type(last, "Doe");
        await user.type(email, "john@example.com");
        await user.type(phone, "0600000000");
        await user.type(pwd, "secret");

        await user.click(submit);

        expect(mockRegister).toHaveBeenCalledWith({
            firstname: "John",
            lastname: "Doe",
            email: "john@example.com",
            phone: "0600000000",
            password: "secret",
        });

        expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });

    it("button to switch to login working", () => {
        render(<Register />);

        const link = screen.getByText("Switch to login");

        expect(link).toHaveAttribute("href", "/login");
    });
});
