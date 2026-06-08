import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Checkbox from "./Checkbox";

describe("Checkbox", () => {
  it("renders the checkbox and doesn't activate the toggle", async () => {
    const handleToggle = vi.fn();
    render(<Checkbox handleToggle={handleToggle} />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toBeInTheDocument();
    expect(handleToggle).not.toHaveBeenCalled();
  });

  it("calls the function when the user presses the checkbox", async () => {
    const handleToggle = vi.fn();
    const user = userEvent.setup();
    render(<Checkbox handleToggle={handleToggle} />);

    const checkbox = screen.getByRole("checkbox");

    await user.click(checkbox);

    expect(checkbox).toBeInTheDocument();
    expect(handleToggle).toHaveBeenCalled();
  });
});
