import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import GroupForm from "./GroupForm";

vi.mock(import("../../users/SearchUser/SearchUser"), () => {
  return {
    default: vi.fn(() => <div data-testid="SearchUser">Search for users</div>),
  };
});

describe("GroupForm", () => {
  it("renders the group form component", async () => {
    render(<GroupForm />);
    const container = await screen.findByTestId("GroupFormContainer");
    const form = await screen.findByRole("form");
    const searchUser = await screen.findByText("Search for users");

    expect(container).toBeInTheDocument();
    expect(form).toBeInTheDocument();
    expect(searchUser).toBeInTheDocument();
  });
});
