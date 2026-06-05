import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MessageSidebar from "./MessageSidebar";
import * as chatFuncs from "../../../services/chatServices";
import { MessageContext } from "../../../contexts/MessageContext";

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

const handleCurrentChat = vi.fn();
const handleCurrentGroup = vi.fn();

describe("MessageSidebar", () => {
  it("Renders the sidebar", async () => {
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

    expect(sidebar).toBeInTheDocument();
  });

  it("should inform that no chats were found", async () => {
    render(
      <MessageContext value={{ chats: [], currentChat: null, content: "All" }}>
        <MessageSidebar
          handleCurrentChat={handleCurrentChat}
          handleCurrentGroup={handleCurrentGroup}
        />
        ,
      </MessageContext>,
    );

    const sidebar = await screen.findByTestId("MessageSidebar");

    const text = await screen.findByText("You don't have any chats yet!");

    expect(sidebar).toBeInTheDocument();

    expect(text).toBeInTheDocument();
  });

  it("Should call the function on page load", async () => {
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
    const chatsMembers = await screen.findByRole("presentation");

    expect(fetchChatsMembers).toHaveBeenCalled();

    expect(sidebar).toBeInTheDocument();

    expect(chatsMembers).toBeInTheDocument();
  });
});
