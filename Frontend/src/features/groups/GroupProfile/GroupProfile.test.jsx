import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import GroupProfile from "./GroupProfile";

vi.mock(import("../GroupProfileForm/GroupProfileForm"), () => {
  return {
    default: vi.fn(({ groupId }) => (
      <div data-testid="GroupProfileForm">Group: {groupId} </div>
    )),
  };
});

const group = { id: "group1", title: "Group 1", adminId: "adm1" };

describe("GroupProfile", () => {
  it("renders the group profile and it's form", async () => {
    const handleProfile = vi.fn();
    render(<GroupProfile group={group} handleProfile={handleProfile} />);

    const groupProfile = await screen.findByTestId("GroupProfile");
    const groupProfForm = await screen.findByTestId("GroupProfile");

    expect(groupProfile).toBeInTheDocument();
    expect(groupProfForm).toBeInTheDocument();
  });
});
