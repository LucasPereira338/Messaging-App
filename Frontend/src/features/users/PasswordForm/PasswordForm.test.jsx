import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PasswordForm from "./PasswordForm";
import * as userFuncs from "../../../services/userServices";

const userId = "dsadas21";

const updatePassword = vi
  .spyOn(userFuncs, "updatePassword")
  .mockImplementation(() =>
    Promise.resolve({
      message: "Success!",
    }),
  );

describe("PasswordForm", () => {
  it("should render the password form", () => {
    render(<PasswordForm userId={userId} />);

    const pwdForm = screen.getByTestId("PasswordForm");

    expect(pwdForm).toBeInTheDocument();
  });

  it("should update the input value", async () => {
    const user = userEvent.setup();
    render(<PasswordForm userId={userId} />);

    const input = await screen.findByTestId("oldPwdInput");

    await user.type(input, "test");

    expect(input.value).toBe("test");
  });

  it("should submit the passwords", async () => {
    const user = userEvent.setup();
    render(<PasswordForm userId={userId} />);

    const btn = await screen.findByRole("button");

    await user.click(btn);

    expect(updatePassword).toHaveBeenCalled();
  });
});
