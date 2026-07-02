import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserForm from "./UserForm";

const mocks = vi.hoisted(() => {
  return {
    fetchLogin: vi.fn(),
    postNewUser: vi.fn(),
  };
});

vi.mock("../../../services/userServices", () => {
  return {
    fetchLogin: mocks.fetchLogin,
    postNewUser: mocks.postNewUser,
  };
});

describe("User Form", () => {
  it("should render the user form login variant", () => {
    const handleLogin = vi.fn();
    const handleUser = vi.fn();
    render(
      <UserForm
        action="login"
        handleLogin={handleLogin}
        handleUser={handleUser}
      />,
    );

    const form = screen.getByTestId("UserForm");
    const labels = screen.getAllByRole("label");

    expect(form).toBeInTheDocument();
    expect(labels.length).toEqual(2);
  });

  it("should render the user form sign-up variant", () => {
    const handleLogin = vi.fn();
    const handleUser = vi.fn();
    render(
      <UserForm
        action="sign-up"
        handleLogin={handleLogin}
        handleUser={handleUser}
      />,
    );

    const form = screen.getByTestId("UserForm");
    const labels = screen.getAllByRole("label");

    expect(form).toBeInTheDocument();
    expect(labels.length).toEqual(6);
  });

  it("should update the input value", async () => {
    const handleLogin = vi.fn();
    const handleUser = vi.fn();
    const user = userEvent.setup();
    render(
      <UserForm
        action="login"
        handleLogin={handleLogin}
        handleUser={handleUser}
      />,
    );

    const form = screen.getByTestId("UserForm");
    const input = screen.getByTestId("usernameInput");

    await user.type(input, "test");

    expect(form).toBeInTheDocument();
    expect(input.value).toBe("test");
  });
});
