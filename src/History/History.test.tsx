import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";
import History from "./History";

afterEach(() => {
    cleanup();
});

describe("List receipts", () => {
    it("List Salesperson receipts", () => {
        render(
            <MemoryRouter>
                <History user={0} />
            </MemoryRouter>
        );
        expect(screen.getByText("Submit History")).toBeInTheDocument();
    });

    it("List Accountant receipts", () => {
        render(
            <MemoryRouter>
                <History user={1} />
            </MemoryRouter>
        );
        expect(screen.getByText("Review History")).toBeInTheDocument();
    });

    it("List Manager receipts", () => {
        render(
            <MemoryRouter>
                <History user={2} />
            </MemoryRouter>
        );
        expect(screen.getByText("Manager History")).toBeInTheDocument();
    });

    it("Return null if unknown user", () => {
        const { container } = render(
            <MemoryRouter>
                <History user={-1} />
            </MemoryRouter>
        );
        expect(container.firstChild).toBeNull();
    });
});
