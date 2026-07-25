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

const members = [
  { id: "adm1", name: "admin" },
  { id: "dsada21", name: "user" },
];

describe("GroupMembers", () => {
  it("renders the group members", () => {
    const handleMember = vi.fn();
    render(
      <MessageContext value={{ user: members[1] }}>
        <GroupMembers
          members={members}
          readOnly={true}
          handleMember={handleMember}
        />
        ,
      </MessageContext>,
    );
    const groupMembers = screen.getByTestId("GroupMembers");
    const entity = screen.getByText("user");

    expect(groupMembers).toBeInTheDocument();
    expect(entity).toBeInTheDocument();
  });

  it("renders the button to remove other members only for the group admin", () => {
    const handleMember = vi.fn();
    render(
      <MessageContext value={{ user: members[0] }}>
        <GroupMembers
          members={members}
          readOnly={false}
          handleMember={handleMember}
        />
        ,
      </MessageContext>,
    );

    const rmvBtn = screen.getAllByRole("button");

    expect(rmvBtn).toHaveLength(1);
  });

  it("does not render the member removal button if the user is not the group admin", () => {
    const handleMember = vi.fn();
    render(
      <MessageContext value={{ user: members[1] }}>
        <GroupMembers
          members={members}
          readOnly={true}
          handleMember={handleMember}
        />
        ,
      </MessageContext>,
    );

    const rmvBtn = screen.queryByText("Remove Member");

    expect(rmvBtn).not.toBeInTheDocument();
  });
});
