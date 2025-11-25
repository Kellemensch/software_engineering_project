import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";
import SalespersonHistory from "./SalespersonHistory";

describe("Salesperson list receipts", () => {
    render(
        <MemoryRouter>
            <SalespersonHistory />
        </MemoryRouter>
    );

    it("Render title", () => {
        expect(screen.getByText("Submit History")).toBeInTheDocument();
    });

    it("Render all items of the list", () => {
        const links = screen.getAllByTestId("notification-link");
        expect(links.length).toBe(6);
    });

    it("Each item has a correct link", () => {
        const links = screen.getAllByTestId("notification-link");
        for (const link of links)
            expect(link).toHaveAttribute("href", "/receiptInformation");
    });

    it("Each item has a valid icon", () => {
        const accepted = screen.getAllByTestId("accepted-icon");
        const rejected = screen.getAllByTestId("rejected-icon");

        expect(accepted.length).toBe(5);
        expect(rejected.length).toBe(1);
    });
});
