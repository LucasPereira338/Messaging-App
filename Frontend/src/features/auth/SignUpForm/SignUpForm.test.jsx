import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SignUpForm from "./SignUpForm";

const handleState = () => console.log("");

describe("Sign up Form", () => {
  it("should render the sign up form container", () => {
    render(<SignUpForm handleLogin={handleState} handleUser={handleState} />);

    const form = screen.getByLabelText("sign-up-container");

    expect(form).toBeInTheDocument();
  });
});
