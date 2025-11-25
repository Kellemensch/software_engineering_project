import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import ReceiptInformation from "./ReceiptInformation";
import { describe, it, expect, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
    cleanup();
});

describe("ReceiptInformation", () => {
    it("renders Salesperson receipt information", () => {
        render(<ReceiptInformation user={0} />);
        expect(screen.getByText("Receipt Information")).toBeInTheDocument();
        expect(screen.getByText("Title")).toBeInTheDocument();
        expect(screen.getByText("Subject")).toBeInTheDocument();
        expect(screen.getByText("Date")).toBeInTheDocument();
        expect(screen.getByText("Status")).toBeInTheDocument();
        expect(screen.getByText("Amount")).toBeInTheDocument();

        const buttonDelete = screen.getByRole("button", { name: "Delete" });
        expect(buttonDelete).toBeInTheDocument();

        const image = screen.getByAltText("Receipt");
        expect(image).toHaveAttribute("src", "/src/assets/DSC09531.jpg");
    });

    it("renders Accountant receipt information", () => {
        render(<ReceiptInformation user={1} />);
        expect(screen.getByText("Receipt Information")).toBeInTheDocument();
        expect(screen.getByText("From: John")).toBeInTheDocument();
        expect(screen.getByText("Title")).toBeInTheDocument();
        expect(screen.getByText("Subject")).toBeInTheDocument();
        expect(screen.getByText("Date")).toBeInTheDocument();
        expect(screen.getByText("Amount")).toBeInTheDocument();
    });

    it("renders Manager receipt information", () => {
        render(<ReceiptInformation user={2} />);
        expect(
            screen.getByText("Manager Receipt Information")
        ).toBeInTheDocument();
    });

    it("return null when unknown user", () => {
        const { container } = render(<ReceiptInformation user={-1} />);
        expect(container.firstChild).toBeNull();
    });
});
