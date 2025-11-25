import React from "react";
import { cleanup, getAllByRole, render, screen } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import Navbar from "./Navbar";

afterEach(() => {
    cleanup();
});

describe("Navbar", () => {
    it("Render Salesperson navbar", () => {
        render(<Navbar user={0} />);
        const links = screen.getAllByRole("link");
        expect(links.length).toBe(7);
    });

    // it("renders Accountant receipt information", () => {
    //     render(<Navbar user={1} />);
    //     expect(screen.getByText("Receipt Information")).toBeInTheDocument();
    //     expect(screen.getByText("From: John")).toBeInTheDocument();
    //     expect(screen.getByText("Title")).toBeInTheDocument();
    //     expect(screen.getByText("Subject")).toBeInTheDocument();
    //     expect(screen.getByText("Date")).toBeInTheDocument();
    //     expect(screen.getByText("Amount")).toBeInTheDocument();
    // });

    // it("renders Manager receipt information", () => {
    //     render(<Navbar user={2} />);
    //     expect(
    //         screen.getByText("Manager Receipt Information")
    //     ).toBeInTheDocument();
    // });

    // it("return null when unknown user", () => {
    //     const { container } = render(<Navbar user={-1} />);
    //     expect(container.firstChild).toBeNull();
    // });
});
