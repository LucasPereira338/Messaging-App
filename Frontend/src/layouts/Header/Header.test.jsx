import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import Header from "./Header.jsx";

describe("Header", () => {
  it("renders the title", () => {
    render(<Header />);

    expect(screen.getByRole("heading").textContent).toMatch(/Message Board/);
  });

  it("renders the log off button", () => {
    render(<Header isLoggedIn={true} />);

    expect(screen.getByRole("button").textContent).toMatch(/Log Off/);
  });

  it("renders the sign up button", () => {
    render(<Header isLoggedIn={false} />);

    expect(screen.getByRole("button").textContent).toMatch(/Sign Up/);
  });
});
