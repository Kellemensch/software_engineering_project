import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";
import AccountantHistory from "./AccountantHistory";

describe("Salesperson list receipts", () => {
    render(
        <MemoryRouter>
            <AccountantHistory />
        </MemoryRouter>
    );
    it("Render title", () => {
        expect(screen.getByText("Review History")).toBeInTheDocument();
    });

    it("Render all items of the list", () => {
        const notifications = screen.getAllByTestId("notification-div");
        expect(notifications.length).toBe(7);
    });

    // it("Each item has a correct link", () => {
    // render(
    //     <MemoryRouter>
    //         <AccountantHistory />
    //     </MemoryRouter>
    // );
    //     const links = screen.getAllByTestId("notification-link");
    //     for (const link of links)
    //         expect(link).toHaveAttribute("href", "/receiptInformation");
    // });

    it("Each item has a valid icon", () => {
        const accepted = screen.getAllByTestId("accepted-icon");
        // const rejected = screen.getAllByTestId("rejected-icon");

        expect(accepted.length).toBe(7);
        // expect(rejected.length).toBe(1);
    });

    it("Test className branches ", () => {
        const items = screen.getAllByTestId("notification-div");

        expect(items[0]).toHaveClass("rejected");
        expect(items[0]).not.toHaveClass("new");
        expect(items[6]).not.toHaveClass("rejected");
        expect(items[6]).toHaveClass("new");
    });
});
