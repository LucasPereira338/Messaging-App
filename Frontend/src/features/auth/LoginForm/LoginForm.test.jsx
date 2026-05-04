import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LoginForm from "./LoginForm";

const handleState = () => console.log("");

describe("Login Form", () => {
  it("should render the login form container", () => {
    render(<LoginForm handleLogin={handleState} handleUser={handleState} />);

    const form = screen.getByLabelText("login-form-container");

    expect(form).toBeInTheDocument();
  });
});
