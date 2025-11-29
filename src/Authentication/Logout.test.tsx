import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Logout from "./Logout";
import { useAuth, useUserOnlyPage } from "./AuthContext";

vi.mock("./AuthContext", async () => {
    const actual = await vi.importActual("./AuthContext");
    return {
        ...actual,
        useAuth: vi.fn(),
        useUserOnlyPage: vi.fn(),
    };
});

const mockLogout = vi.fn();
const mockGuard = vi.fn();

beforeEach(() => {
    vi.clearAllMocks();

    (useAuth as any).mockReturnValue({
        logout: mockLogout,
    });

    (useUserOnlyPage as any).mockReturnValue(mockGuard);
});

describe("Logout component", () => {
    it("call logout", () => {
        render(<Logout />);

        // effet appelé immédiatement
        expect(mockLogout).toHaveBeenCalledTimes(1);

        // texte visible
        expect(screen.getByText("Logging you out...")).toBeInTheDocument();
    });

    it("call the guard useUserOnlyPage", () => {
        render(<Logout />);
        expect(useUserOnlyPage).toHaveBeenCalledTimes(1);
    });
});
