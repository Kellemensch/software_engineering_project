import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import Login from "./Login";

describe("Receipt information Salesperson", () => {
    render(<Login />);

    it("Render email and password", () => {
        expect(screen.getByPlaceholderText("Mail")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    });

    it("Render the submit button", () => {
        const button = screen.getByRole("button", { name: "Submit" });
        expect(button).toBeInTheDocument();
    });
});
