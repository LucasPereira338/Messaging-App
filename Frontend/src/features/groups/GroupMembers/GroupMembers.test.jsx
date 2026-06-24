import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import GroupMembers from "./GroupMembers";
import { MessageContext } from "../../../contexts/MessageContext";

vi.mock(import("../../../components/entities/EntityCard/EntityCard"), () => {
  return {
    default: vi.fn(({ entity }) => (
      <div data-testid="EntityCard">{entity.name}</div>
    )),
  };
});

vi.mock(import("../users/SearchUser/SearchUser"), () => {
  return {
    default: vi.fn(() => <div data-testid="SearchUser">Search for users</div>),
  };
});

const members = [{ id: "dsada21", name: "user" }];

describe("GroupMembers", () => {
  it("renders the group members", () => {
    const handleMember = vi.fn();
    render(
      <GroupMembers
        members={members}
        readOnly={true}
        handleMember={handleMember}
      />,
    );

    const groupMembers = screen.getByTestId("GroupMembers");
    const entity = screen.getByText("user");

    expect(groupMembers).toBeInTheDocument();
    expect(entity).toBeInTheDocument();
  });

  it("toggles on the user search bar", async () => {
    const handleMember = vi.fn();
    const user = userEvent.setup();
    render(
      <GroupMembers
        members={members}
        readOnly={false}
        handleMember={handleMember}
      />,
    );

    const toggleBtn = await screen.findByTestId("AddMemberToggle");

    await user.click(toggleBtn);

    const searchUser = await screen.findByTestId("SearchUser");

    expect(searchUser).toBeInTheDocument();
  });
});
