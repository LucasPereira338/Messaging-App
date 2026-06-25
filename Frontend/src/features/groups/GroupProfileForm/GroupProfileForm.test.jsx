import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as groupFuncs from "../../../services/groupServices";
import GroupProfileForm from "./GroupProfileForm";

vi.mock(import("../GroupMembers/GroupMembers"), () => {
  return {
    default: vi.fn(({ members }) => (
      <div data-testid="GroupMembers">{members[0].name}</div>
    )),
  };
});

const fetchGroup = vi.spyOn(groupFuncs, "fetchGroup").mockImplementation(() =>
  Promise.resolve({
    id: "dsada21",
    title: "Test Group",
    portrait: "group.png",
    adminId: "user21",
    chat: {
      id: "chat13251",
      members: [
        {
          id: "user21",
          name: "user",
          username: "user1",
          portrait: "user.png",
        },
        {
          id: "user22",
          name: "user2",
          username: "user2",
          portrait: "user2.png",
        },
      ],
    },
  }),
);

describe("GroupProfileForm", () => {
  it("renders the group profile form", async () => {
    render(<GroupProfileForm groupId={"fdas21"} readOnly={true} />);

    const gpForm = await screen.findByTestId("GroupProfileForm");

    expect(gpForm).toBeInTheDocument();
  });

  it("fetches the group data on load and displays the group members", async () => {
    render(<GroupProfileForm groupId={"fdas21"} readOnly={true} />);

    const entity = await screen.findByText("user");

    expect(fetchGroup).toHaveBeenCalled();
    expect(entity).toBeInTheDocument();
  });
});
