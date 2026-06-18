import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { postNewMessage } from "../../../services/messageServices";
import { MessageContext } from "../../../contexts/MessageContext";
import MessageInput from "./MessageInput";

const mocks = vi.hoisted(() => {
  return {
    postNewMessage: vi.fn(),
  };
});

vi.mock("../../../services/messageServices", () => {
  return {
    postNewMessage: mocks.postNewMessage,
  };
});

const user = { id: "sdadsao0" };
const currentChat = { id: "ffddds1" };

describe("MessageInput", () => {
  it("renders the message input", () => {
    const handleChats = vi.fn();
    render(
      <MessageContext value={{ currentChat: currentChat }}>
        <MessageInput user={user} handleChats={handleChats} />,
      </MessageContext>,
    );

    const msgInp = screen.getByTestId("MessageInput");

    expect(msgInp).toBeInTheDocument();
  });

  it("allows the user to type a message", async () => {
    const handleChats = vi.fn();
    const user = userEvent.setup();
    render(
      <MessageContext value={{ currentChat: currentChat }}>
        <MessageInput user={user} handleChats={handleChats} />,
      </MessageContext>,
    );

    const textarea = await screen.findByTestId("TextArea");

    await user.type(textarea, "test");

    expect(textarea.value).toBe("test");
  });

  it("allows the user to send a message", async () => {
    const handleChats = vi.fn();
    const user = userEvent.setup();
    render(
      <MessageContext value={{ currentChat: currentChat }}>
        <MessageInput user={user} handleChats={handleChats} />,
      </MessageContext>,
    );

    const textarea = await screen.findByTestId("TextArea");

    await user.type(textarea, "test");
    await user.keyboard("{Enter}");

    expect(postNewMessage).toHaveBeenCalled();
    expect(textarea.value).toBe("");
  });
});
