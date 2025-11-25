import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import Register from "./Register";

describe("Receipt information Salesperson", () => {
    render(<Register />);

    it("Render inputs", () => {
        expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Mail")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Phone Number")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText("Re-Enter Password")
        ).toBeInTheDocument();
    });

    it("Render the submit button", () => {
        const button = screen.getByRole("button", { name: "Submit" });
        expect(button).toBeInTheDocument();
    });
});
