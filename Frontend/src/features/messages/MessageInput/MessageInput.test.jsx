import { vi, describe, it, expect } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import MessageInput from "./MessageInput";
import { postNewMessage } from "../../../services/messageServices";
import { MessageContext } from "../../../contexts/MessageContext";

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
const updateIsNewMessage = () => {
  return 1;
};

describe("MessageInput", () => {
  it("Renders the message input", () => {
    render(
      <MessageContext value={{ currentChat: currentChat }}>
        <MessageInput user={user} updateIsNewMessage={updateIsNewMessage} />,
      </MessageContext>,
    );

    const msgInp = screen.getByTestId("MessageInput");

    expect(msgInp).toBeInTheDocument();
  });

  it("Should not call the function", () => {
    render(
      <MessageContext value={{ currentChat: currentChat }}>
        <MessageInput user={user} updateIsNewMessage={updateIsNewMessage} />,
      </MessageContext>,
    );

    expect(postNewMessage).not.toHaveBeenCalled();
  });

  it("Should submit the form", async () => {
    render(
      <MessageContext value={{ currentChat: currentChat }}>
        <MessageInput user={user} updateIsNewMessage={updateIsNewMessage} />,
      </MessageContext>,
    );

    const form = screen.getByLabelText("message-input-form");

    await waitFor(() => {
      fireEvent.submit(form);
    });

    expect(postNewMessage).toHaveBeenCalled();
  });
});
