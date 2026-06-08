import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import SignUpForm from "./SignUpForm";

vi.mock(import("../UserForm/UserForm.jsx"), () => {
  return {
    default: vi.fn(({ action }) => (
      <form data-testid="UserForm">Form for user {action}</form>
    )),
  };
});

describe("Sign up Form", () => {
  it("should render the sign up form", async () => {
    const handleLogin = vi.fn();
    const handleUser = vi.fn();
    render(<SignUpForm handleLogin={handleLogin} handleUser={handleUser} />);

    const signUpForm = screen.getByTestId("SignUpContainer");
    const userForm = await screen.findByText("Form for user sign-up");

    expect(signUpForm).toBeInTheDocument();
    expect(userForm).toBeInTheDocument();
  });
});
