import { vi, describe, it, expect } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import ChatBox from "./ChatBox";
import { fetchChatMessages } from "../../../services/messageServices";

const mocks = vi.hoisted(() => {
  return {
    fetchChatMessages: vi.fn(),
  };
});

vi.mock("../../../services/messageServices", () => {
  return {
    fetchChatMessages: mocks.fetchChatMessages,
  };
});

const user = {
  id: "sdasdsa",
  username: "pete",
  name: "pete the meek",
  portrait: "pete.jpg",
};
const talkingWith = {
  id: "sdassdsssdsa",
  username: "peter",
  name: "peter the meeker",
  portrait: "peter.jpg",
};

describe("ChatBox", () => {
  it("Renders the chat box", () => {
    render(<ChatBox user={user} talkingWith={talkingWith} />);

    const chatBox = screen.getByTestId("ChatBox");

    expect(chatBox).toBeInTheDocument();
  });

  it("Should call the function on page load", async () => {
    render(<ChatBox user={user} talkingWith={talkingWith} />);

    const chatBox = screen.getByTestId("ChatBox");

    await waitFor(() => {
      fireEvent.submit(chatBox);
    });

    expect(fetchChatMessages).toHaveBeenCalled();
  });
});
