import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import GroupProfile from "./GroupProfile";

vi.mock(import("../../components/common/CloseButton/CloseButton"), () => {
  return {
    default: vi.fn(() => <div data-testid="CloseButton">Button</div>),
  };
});

vi.mock(import("../GroupProfileForm/GroupProfileForm"), () => {
  return {
    default: vi.fn(({ groupId }) => (
      <div data-testid="GroupProfileForm">Group: {groupId} </div>
    )),
  };
});

describe("MessageSidebar", () => {
  it("renders the sidebar and it's entities", async () => {
    const handleProfile = vi.fn();
    render(<GroupProfile />);

    const sidebar = await screen.findByTestId("MessageSidebar");
    const entity = await screen.findByText("Entity: user");

    expect(sidebar).toBeInTheDocument();
    expect(entity).toBeInTheDocument();
  });

  it("only displays the group chats", async () => {
    render(
      <MessageContext
        value={{
          chats: [{ id: "dsada21", name: "user" }],
          currentChat: { id: "dsada21" },
          content: "Groups",
          onlineOnly: false,
        }}
      >
        <MessageSidebar />,
      </MessageContext>,
    );

    const group = await screen.findByText("Create Group");

    expect(group).toBeInTheDocument();
  });

  it("should inform that no chats were found", async () => {
    render(
      <MessageContext value={{ chats: [], currentChat: null, content: "All" }}>
        <MessageSidebar />,
      </MessageContext>,
    );

    const text = await screen.findByText("You don't have any chats yet!");

    expect(text).toBeInTheDocument();
  });
});
