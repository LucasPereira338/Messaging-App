import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";
import { fetchLogin } from "../../../services/userServices";

const mocks = vi.hoisted(() => {
  return {
    fetchLogin: vi.fn(),
  };
});

vi.mock("../../../services/userServices", () => {
  return {
    fetchLogin: mocks.fetchLogin,
  };
});

describe("Login Form", () => {
  it("should render the login form", () => {
    render(<LoginForm />);

    const form = screen.getByRole("form", { name: /login-form/ });

    expect(form).toBeInTheDocument();
  });

  it("should not call the function", () => {
    render(<LoginForm />);

    expect(fetchLogin).not.toHaveBeenCalled();
  });

  it("should call the function", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const button = screen.getByRole("button");

    await user.click(button);

    expect(fetchLogin).toHaveBeenCalled();
  });
});
