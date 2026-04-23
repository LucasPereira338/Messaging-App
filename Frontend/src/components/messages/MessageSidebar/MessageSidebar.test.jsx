import { vi, describe, it, expect } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import MessageSidebar from "./MessageSidebar";
import { fetchUsersInList } from "../../../services/userServices";

const mocks = vi.hoisted(() => {
  return {
    fetchUsersInList: vi.fn(),
  };
});

vi.mock("../../../services/userServices", () => {
  return {
    fetchUsersInList: mocks.fetchUsersInList,
  };
});

const talkingWith = {
  id: "sdassdsssdsa",
  username: "peter",
  name: "peter the meeker",
  portrait: "peter.jpg",
};

const messages = {
  data: [
    { id: "safs21", authorId: "sdada", receiverId: "s221", content: "testing" },
  ],
};

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

  it("Should call the function on page load", async () => {
    render(
      <MessageSidebar
        messages={messages}
        talkingWith={talkingWith}
        handleTalkingWith={handleTalkingWith}
      />,
    );

    const sidebar = screen.getByTestId("MessageSidebar");

    await waitFor(() => {
      fireEvent.submit(sidebar);
    });

    expect(fetchUsersInList).toHaveBeenCalled();
  });
});
