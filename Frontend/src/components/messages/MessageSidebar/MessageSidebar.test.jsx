import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MessageSidebar from "./MessageSidebar";
import { MessageContext } from "../../../contexts/MessageContext";

vi.mock(import("../../entities/EntityCard/EntityCard"), () => {
  return {
    default: vi.fn(({ entity }) => (
      <div data-testid="EntityCard">Entity: {entity.name}</div>
    )),
  };
});

const values = {
  chats: [{ id: "dsada21", name: "user" }],
  currentChat: { id: "dsada21" },
  content: "All",
  onlineOnly: false,
};

describe("MessageSidebar", () => {
  it("renders the sidebar and it's entities", async () => {
    render(
      <MessageContext value={values}>
        <MessageSidebar />,
      </MessageContext>,
    );

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
