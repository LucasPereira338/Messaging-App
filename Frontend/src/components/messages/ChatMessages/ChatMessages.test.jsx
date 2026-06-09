import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ChatMessages from "./ChatMessages";

const messages = [{ id: "adasd9j90", content: "testing" }];

vi.mock(import("../Message/Message.jsx"), () => {
  return {
    default: vi.fn(({ message, setMsgToDel }) => (
      <div data-testid="Message" onClick={setMsgToDel}>
        Message: {message.content}
      </div>
    )),
  };
});

describe("Chat Messages", () => {
  it("renders the chat messages", async () => {
    const setMsgToDel = vi.fn();
    render(<ChatMessages messages={messages} setMsgToDel={setMsgToDel} />);

    const chatMsgs = screen.getByTestId("ChatMessages");
    const msg = await screen.findByText("Message: testing");

    expect(chatMsgs).toBeInTheDocument();
    expect(msg).toBeInTheDocument();
  });
});
