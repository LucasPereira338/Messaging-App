import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import Footer from "./Footer";

describe("Footer", () => {
  it("Renders the footer content", () => {
    render(<Footer />);

    expect(screen.getByRole("heading").textContent).toMatch("Copyright");
  });
});
