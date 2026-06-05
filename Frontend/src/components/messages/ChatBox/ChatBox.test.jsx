import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ChatBox from "./ChatBox";
import Message from "../Message/Message";
import * as chatFuncs from "../../../services/chatServices";
import { MessageContext } from "../../../contexts/MessageContext";

vi.mock(import("../../entities/EntityCard/EntityCard.jsx"), () => {
  return {
    default: vi.fn(({ entity }) => (
      <div data-testid="EntityCard">Entity: {entity.name}</div>
    )),
  };
});

const fetchChatMessages = vi
  .spyOn(chatFuncs, "fetchChatMessages")
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
  currentChat: {
    chatId: "dsada21",
    id: "user21",
    name: "user",
    username: "user1",
    portrait: "user.png",
  },
};

describe("ChatBox", () => {
  it("renders the empty chat box message", async () => {
    render(
      <MessageContext value={{ chats: [], currentChat: null, content: "All" }}>
        <ChatBox />
      </MessageContext>,
    );

    const emptyMsg = await screen.findByText(
      "Use the search bar to find new people to chat with!",
    );

    expect(emptyMsg).toBeInTheDocument();
  });

  it("renders the chat box where the two users chat", async () => {
    render(
      <MessageContext value={values}>
        <ChatBox />
      </MessageContext>,
    );

    const chatBox = await screen.findByTestId("ChatBox");
    const txt = await screen.findByText("Entity: user");

    expect(fetchChatMessages).toHaveBeenCalled();
    expect(chatBox).toBeInTheDocument();
    expect(txt).toBeInTheDocument();
  });
});
