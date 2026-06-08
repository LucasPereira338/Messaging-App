import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PageSidebar from "./PageSidebar";
import { MessageContext } from "../../../contexts/MessageContext";

const value = {
  content: "All",
};

describe("PageSidebar", () => {
  it("renders the page sidebar", () => {
    const handleContent = vi.fn();
    const handleLogout = vi.fn();
    render(
      <MessageContext value={value}>
        <PageSidebar
          handleContent={handleContent}
          handleLogout={handleLogout}
        />
      </MessageContext>,
    );

    const sidebar = screen.getByTestId("PageSidebar");

    expect(sidebar).toBeInTheDocument();
  });

  it("allows the user to change content filter", async () => {
    const handleContent = vi.fn();
    const user = userEvent.setup();
    render(
      <MessageContext value={value}>
        <PageSidebar handleContent={handleContent} />
      </MessageContext>,
    );

    const sidebar = screen.getByTestId("PageSidebar");
    const choice = screen.getByTestId("ContentChoiceAll");

    await user.click(choice);

    expect(sidebar).toBeInTheDocument();
    expect(choice).toBeInTheDocument();
    expect(handleContent).toHaveBeenCalled();
  });

  it("allows the user to logout", async () => {
    const handleLogout = vi.fn();
    const user = userEvent.setup();
    render(
      <MessageContext value={value}>
        <PageSidebar handleLogout={handleLogout} />
      </MessageContext>,
    );

    const sidebar = screen.getByTestId("PageSidebar");
    const logout = screen.getByTestId("LogoutChoice");

    await user.click(logout);

    expect(sidebar).toBeInTheDocument();
    expect(logout).toBeInTheDocument();
    expect(handleLogout).toHaveBeenCalled();
  });
});
