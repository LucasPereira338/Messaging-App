import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MessageSidebar from "./MessageSidebar";
import * as chatFuncs from "../../../services/chatServices";
import { MessageContext } from "../../../contexts/MessageContext";

vi.mock(import("../../entities/EntityCard/EntityCard"), () => {
  return {
    default: vi.fn(({ entity }) => (
      <div data-testid="EntityCard">Entity: {entity.name}</div>
    )),
  };
});

const fetchChatsMembers = vi
  .spyOn(chatFuncs, "fetchChatsMembers")
  .mockImplementation(() =>
    Promise.resolve([
      {
        id: "dsada21",
        members: [
          {
            id: "user21",
            name: "user",
            username: "user1",
            portrait: "user.png",
          },
        ],
        messages: [{ id: "321e3", content: "Hi" }],
      },
    ]),
  );

const values = {
  chats: [{ id: "dsada21" }],
  currentChat: { id: "dsada21" },
  content: "All",
};

describe("MessageSidebar", () => {
  it("renders the sidebar and it's entities", async () => {
    const handleCurrentChat = vi.fn();
    const handleCurrentGroup = vi.fn();
    render(
      <MessageContext value={values}>
        <MessageSidebar
          handleCurrentChat={handleCurrentChat}
          handleCurrentGroup={handleCurrentGroup}
        />
        ,
      </MessageContext>,
    );

    const sidebar = await screen.findByTestId("MessageSidebar");
    const entity = await screen.findByText("Entity: user");

    expect(sidebar).toBeInTheDocument();
    expect(entity).toBeInTheDocument();
  });

  it("only displays the group chats", async () => {
    const handleCurrentChat = vi.fn();
    const handleCurrentGroup = vi.fn();
    render(
      <MessageContext
        value={{
          chats: [{ id: "dsada21" }],
          currentChat: { id: "dsada21" },
          content: "Group",
        }}
      >
        <MessageSidebar
          handleCurrentChat={handleCurrentChat}
          handleCurrentGroup={handleCurrentGroup}
        />
        ,
      </MessageContext>,
    );

    const group = await screen.findByText("Create Group");

    expect(group).toBeInTheDocument();
  });

  it("should inform that no chats were found", async () => {
    const handleCurrentChat = vi.fn();
    const handleCurrentGroup = vi.fn();
    render(
      <MessageContext value={{ chats: [], currentChat: null, content: "All" }}>
        <MessageSidebar
          handleCurrentChat={handleCurrentChat}
          handleCurrentGroup={handleCurrentGroup}
        />
        ,
      </MessageContext>,
    );

    const text = await screen.findByText("You don't have any chats yet!");

    expect(text).toBeInTheDocument();
  });

  it("should start searching for the chats members on page load", async () => {
    const handleCurrentChat = vi.fn();
    const handleCurrentGroup = vi.fn();
    render(
      <MessageContext value={values}>
        <MessageSidebar
          handleCurrentChat={handleCurrentChat}
          handleCurrentGroup={handleCurrentGroup}
        />
        ,
      </MessageContext>,
    );

    const chatsMembers = await screen.findByRole("presentation");

    expect(fetchChatsMembers).toHaveBeenCalled();

    expect(chatsMembers).toBeInTheDocument();
  });
});
