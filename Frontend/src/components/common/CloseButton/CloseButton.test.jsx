import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CloseButton from "./CloseButton";

describe("CloseButton", () => {
  it("renders the 'button'", async () => {
    const handleClick = vi.fn();
    render(<CloseButton handleClick={handleClick} />);

    const closeBtn = screen.getByRole("button");

    expect(closeBtn).toBeInTheDocument();
  });

  it("calls the function", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<CloseButton handleClick={handleClick} />);

    const closeBtn = screen.getByRole("button");

    await user.click(closeBtn);

    expect(handleClick).toHaveBeenCalled();
  });
});
