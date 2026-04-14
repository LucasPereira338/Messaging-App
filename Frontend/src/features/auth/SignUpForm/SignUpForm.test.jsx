import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUpForm from "./SignUpForm";

describe("Sign Up Form", () => {
  it("Renders the form", () => {
    render(<SignUpForm postNewUser={() => {}} />);

    const form = screen.getByRole("form", { name: /sign-up-form/ });

    expect(form).toBeInTheDocument();
  });

  it("Should call the function when form is submitted", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<SignUpForm postNewUser={onClick} />);

    const button = screen.getByRole("button");

    await user.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  it("Should call the function when form is submitted", async () => {
    const onClick = vi.fn();

    render(<SignUpForm postNewUser={onClick} />);

    expect(onClick).not.toHaveBeenCalled();
  });
});
