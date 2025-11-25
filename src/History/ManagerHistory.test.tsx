import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import ManagerHistory from "./ManagerHistory";

describe("List Manager receipts", () => {
    render(<ManagerHistory />);
    it("List Manager receipts", () => {
        expect(screen.getByText("Manager History")).toBeInTheDocument();
    });
});
