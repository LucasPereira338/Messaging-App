import { vi, describe, it, expect } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import MessageSidebar from "./MessageSidebar";
import * as chatFuncs from "../../../services/chatServices";
import { MessageContext } from "../../../contexts/MessageContext";

const fetchChatsMembers = vi
  .spyOn(chatFuncs, "fetchChatsMembers")
  .mockImplementation(() => {});

const values = {
  chats: [0],
  currentChat: [{ id: 0 }],
  content: "All",
};

const handleCurrentChat = vi.fn();
const handleCurrentGroup = vi.fn();

describe("MessageSidebar", () => {
  it("Renders the sidebar", () => {
    render(
      <MessageContext value={values}>
        <MessageSidebar
          handleCurrentChat={handleCurrentChat}
          handleCurrentGroup={handleCurrentGroup}
        />
        ,
      </MessageContext>,
    );

    const sidebar = screen.getByTestId("MessageSidebar");

    expect(sidebar).toBeInTheDocument();
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

    const sidebar = screen.getByTestId("MessageSidebar");

    await waitFor(() => {
      fireEvent.submit(sidebar);
    });

    expect(fetchChatsMembers).toHaveBeenCalled();
  });
});
