import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ChatMessages from "./ChatMessages";

const messages = [{ id: "adasd9j90", content: "testing" }];

describe("Chat Messages", () => {
  it("Renders the chat messages", () => {
    render(<ChatMessages messages={messages} />);

    const chatMsgs = screen.getByTestId("ChatMessages");

    expect(chatMsgs).toBeInTheDocument();
  });
});
