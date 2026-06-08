import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import LoginForm from "./LoginForm";

vi.mock(import("../UserForm/UserForm.jsx"), () => {
  return {
    default: vi.fn(({ action }) => (
      <form data-testid="UserForm">Form for user {action}</form>
    )),
  };
});

describe("Login Form", () => {
  it("should render the login form", async () => {
    const handleLogin = vi.fn();
    const handleUser = vi.fn();
    render(<LoginForm handleLogin={handleLogin} handleUser={handleUser} />);

    const loginForm = screen.getByTestId("LoginForm");
    const userForm = await screen.findByText("Form for user login");

    expect(loginForm).toBeInTheDocument();
    expect(userForm).toBeInTheDocument();
  });
});
