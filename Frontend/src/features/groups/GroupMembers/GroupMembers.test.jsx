import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
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
});
