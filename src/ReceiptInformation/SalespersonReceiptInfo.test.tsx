import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import SalespersonReceiptInfo from "./SalespersonReceiptInfo";

describe("Receipt information Salesperson", () => {
    render(<SalespersonReceiptInfo />);

    it("Render Salesperson receipt information", () => {
        expect(screen.getByText("Receipt Information")).toBeInTheDocument();
        expect(screen.getByText("Title")).toBeInTheDocument();
        expect(screen.getByText("Subject")).toBeInTheDocument();
        expect(screen.getByText("Date")).toBeInTheDocument();
        expect(screen.getByText("Status")).toBeInTheDocument();
        expect(screen.getByText("Amount")).toBeInTheDocument();
    });

    it("Render an image", () => {
        const image = screen.getByRole("img");
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", "/src/assets/DSC09531.jpg");
    });

    it("Render the button", () => {
        const button = screen.getByRole("button", { name: "Delete" });
        expect(button).toBeInTheDocument();
    });

    // it("renders Manager receipt information", () => {});
});
