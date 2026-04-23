import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import MessageSidebar from "./MessageSidebar";

const talkingWith = {
  id: "sdassdsssdsa",
  username: "peter",
  name: "peter the meeker",
  portrait: "peter.jpg",
};

const messages = [{ content: "testing" }];

const handleTalkingWith = vi.fn();

describe("MessageSidebar", () => {
  it("Renders the sidebar", () => {
    render(
      <MessageSidebar
        messages={messages}
        talkingWith={talkingWith}
        handleTalkingWith={handleTalkingWith}
      />,
    );

    const sidebar = screen.getByTestId("MessageSidebar");

    expect(sidebar).toBeInTheDocument();
  });
});
