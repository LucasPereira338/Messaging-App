import { vi, describe, it, expect } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import UserForm from "./UserForm";
import { fetchLogin, postNewUser } from "../../../services/userServices";

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

const handleState = () => console.log("");

describe("User Form", () => {
  it("should render the user form login variant", () => {
    render(
      <UserForm
        action="login"
        handleLogin={handleState}
        handleUser={handleState}
      />,
    );

    const form = screen.getByRole("form", { name: /user-form/ });

    expect(form).toBeInTheDocument();
  });

  it("should render the user form sign-up variant", () => {
    render(
      <UserForm
        action="sign-up"
        handleLogin={handleState}
        handleUser={handleState}
      />,
    );

    const form = screen.getByRole("form", { name: /user-form/ });

    expect(form).toBeInTheDocument();
  });

  it("should not call the login function", () => {
    render(
      <UserForm
        action="login"
        handleLogin={handleState}
        handleUser={handleState}
      />,
    );

    expect(fetchLogin).not.toHaveBeenCalled();
  });

  it("should call the login function", async () => {
    render(
      <UserForm
        action="login"
        handleLogin={handleState}
        handleUser={handleState}
      />,
    );

    const form = screen.getByRole("form", { name: /user-form/ });

    await waitFor(() => {
      fireEvent.submit(form);
    });

    expect(fetchLogin).toHaveBeenCalled();
  });

  it("should not call the sign-up function", () => {
    render(
      <UserForm
        action="sign-up"
        handleLogin={handleState}
        handleUser={handleState}
      />,
    );

    expect(postNewUser).not.toHaveBeenCalled();
  });

  it("should call the sign-up function", async () => {
    render(
      <UserForm
        action="sign-up"
        handleLogin={handleState}
        handleUser={handleState}
      />,
    );

    const form = screen.getByRole("form", { name: /user-form/ });

    await waitFor(() => {
      fireEvent.submit(form);
    });

    expect(postNewUser).toHaveBeenCalled();
  });
});
