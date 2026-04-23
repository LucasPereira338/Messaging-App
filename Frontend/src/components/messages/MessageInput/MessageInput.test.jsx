import { vi, describe, it, expect } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import MessageInput from "./MessageInput";
import { postNewMessage } from "../../../services/messageServices";

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
const talkingWith = { id: "ffddds1" };
const updateIsNewMessage = () => {
  return 1;
};

describe("MessageInput", () => {
  it("Renders the form", () => {
    render(
      <MessageInput
        user={user}
        talkingWith={talkingWith}
        updateIsNewMessage={updateIsNewMessage}
      />,
    );

    const form = screen.getByLabelText("message-input-form");

    expect(form).toBeInTheDocument();
  });

  it("Renders the message input", () => {
    render(
      <MessageInput
        user={user}
        talkingWith={talkingWith}
        updateIsNewMessage={updateIsNewMessage}
      />,
    );

    const msgInp = screen.getByTestId("MessageInput");

    expect(msgInp).toBeInTheDocument();
  });

  it("Should not call the function", () => {
    render(
      <MessageInput
        user={user}
        talkingWith={talkingWith}
        updateIsNewMessage={updateIsNewMessage}
      />,
    );

    expect(postNewMessage).not.toHaveBeenCalled();
  });

  it("Should submit the form", async () => {
    render(
      <MessageInput
        user={user}
        talkingWith={talkingWith}
        updateIsNewMessage={updateIsNewMessage}
      />,
    );

    const form = screen.getByLabelText("message-input-form");

    await waitFor(() => {
      fireEvent.submit(form);
    });

    expect(postNewMessage).toHaveBeenCalled();
  });
});
