import { vi, describe, it, expect } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import ChatBox from "./ChatBox";
import { MessageContext } from "../../../contexts/MessageContext";
import { fetchChatMessages } from "../../../services/chatServices";
import Message from "../Message/Message";

const mocks = vi.hoisted(() => {
  return {
    fetchChatMessages: vi.fn(),
  };
});

vi.mock("../../../services/chatServices", () => {
  return {
    fetchChatMessages: mocks.fetchChatMessages,
  };
});

const values = {
  chats: [{ id: "dsada21" }],
  currentChat: { chatId: "dsada21" },
  content: "All",
};

describe("ChatBox", () => {
  it("Renders the empty chat box message", () => {
    render(
      <MessageContext value={values}>
        <ChatBox />
      </MessageContext>,
    );

    const chatBox = screen.getByTestId("ChatBox");

    expect(chatBox).toBeInTheDocument();
  });
  it("Renders the chat box", () => {
    render(
      <MessageContext value={values}>
        <ChatBox />
      </MessageContext>,
    );

    const chatBox = screen.getByTestId("ChatBox");

    expect(chatBox).toBeInTheDocument();
  });

  it("Should call the function on page load", async () => {
    render(
      <MessageContext value={values}>
        <ChatBox />
      </MessageContext>,
    );

    const chatBox = screen.getByTestId("ChatBox");

    await waitFor(() => {
      fireEvent.submit(chatBox);
    });

    expect(fetchChatMessages).toHaveBeenCalled();
  });
});
