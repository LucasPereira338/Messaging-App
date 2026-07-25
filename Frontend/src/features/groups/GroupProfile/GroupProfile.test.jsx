import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import GroupProfile from "./GroupProfile";
import { MessageContext } from "../../../contexts/MessageContext";

vi.mock(import("../GroupProfileForm/GroupProfileForm"), () => {
  return {
    default: vi.fn(({ groupId }) => (
      <div data-testid="GroupProfileForm">Group: {groupId} </div>
    )),
  };
});

const group = { id: "group1", title: "Group 1", adminId: "adm1" };

const user = { id: "sda1", name: "user" };

describe("GroupProfile", () => {
  it("renders the group profile and it's form", async () => {
    const handleProfile = vi.fn();
    render(
      <MessageContext value={{ user: user }}>
        <GroupProfile group={group} handleProfile={handleProfile} />,
      </MessageContext>,
    );

    const groupProfile = await screen.findByTestId("GroupProfile");
    const groupProfForm = await screen.findByTestId("GroupProfileForm");

    expect(groupProfile).toBeInTheDocument();
    expect(groupProfForm).toBeInTheDocument();
  });

  it("renders the button that allows members who aren't admins to leave the group", async () => {
    const handleProfile = vi.fn();
    render(
      <MessageContext value={{ user: user }}>
        <GroupProfile group={group} handleProfile={handleProfile} />,
      </MessageContext>,
    );

    const leaveBtn = await screen.findByText("Leave Group");

    expect(leaveBtn).toBeInTheDocument();
  });

  it("renders the button that allows the admin to delete the group", async () => {
    const handleProfile = vi.fn();
    render(
      <MessageContext value={{ user: user }}>
        <GroupProfile group={group} handleProfile={handleProfile} />,
      </MessageContext>,
    );

    const quitBtn = await screen.findByText("Leave Group");

    expect(quitBtn).toBeInTheDocument();
  });
});
