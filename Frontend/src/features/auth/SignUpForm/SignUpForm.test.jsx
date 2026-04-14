import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUpForm from "./SignUpForm";
import { postNewUser } from "../../../services/userServices";

const mocks = vi.hoisted(() => {
  return {
    postNewUser: vi.fn(),
  };
});

vi.mock("../../../services/userServices", () => {
  return {
    postNewUser: mocks.postNewUser,
  };
});

describe("Sign Up Form", () => {
  it("Renders the form", () => {
    render(<SignUpForm />);

    const form = screen.getByRole("form", { name: /sign-up-form/ });

    expect(form).toBeInTheDocument();
  });

  it("Should not call the function", async () => {
    render(<SignUpForm />);

    expect(postNewUser).not.toHaveBeenCalled();
  });

  it("Should call the function when form is submitted", async () => {
    const user = userEvent.setup();
    render(<SignUpForm />);

    const button = screen.getByRole("button");

    await user.click(button);

    expect(postNewUser).toHaveBeenCalled();
  });
});
