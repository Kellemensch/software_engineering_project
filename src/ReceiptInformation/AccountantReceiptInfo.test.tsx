import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import AccountantReceiptInfo from "./AccountantReceiptInfo";

describe("Receipt information Accountant", () => {
    render(<AccountantReceiptInfo />);

    it("Render Accountant receipt information", () => {
        expect(screen.getByText("Receipt Information")).toBeInTheDocument();
        expect(screen.getByText("From: John")).toBeInTheDocument();
        expect(screen.getByText("Subject")).toBeInTheDocument();
        expect(screen.getByText("Date")).toBeInTheDocument();
        expect(screen.getByText("Title")).toBeInTheDocument();
        expect(screen.getByText("Amount")).toBeInTheDocument();
    });

    it("Render an image", () => {
        const image = screen.getByRole("img");
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", "/src/assets/DSC09531.jpg");
    });

    it("Render the valid button", () => {
        const buttonValid = screen.getByRole("button", { name: "Valid" });
        expect(buttonValid).toBeInTheDocument();
    });

    it("Render the not valid button", () => {
        const buttonNotValid = screen.getByRole("button", {
            name: "Not Valid",
        });
        expect(buttonNotValid).toBeInTheDocument();
    });

    // it("renders Manager receipt information", () => {});
});
