import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Message from "./Message";

const message = {
  authorId: "sdadas121",
  userId: "sdadas121",
  content: "testing",
  image: "example.png",
  portrait: "user.png",
  createdAt: Date.now(),
};

describe("Message", () => {
  it("renders the message", () => {
    const setMsgToDel = vi.fn();
    render(<Message message={message} setMsgToDel={setMsgToDel} />);

    const msg = screen.getByTestId("Message");
    const msgText = screen.getByText("testing");
    const portrait = screen.getByRole("Portrait");
    const msgImg = screen.getByRole("MsgImg");
    const deleteImg = screen.getByRole("Delete");

    expect(msg).toBeInTheDocument();
    expect(msgText).toBeInTheDocument();
    expect(portrait).toBeInTheDocument();
    expect(msgImg).toBeInTheDocument();
    expect(deleteImg).toBeInTheDocument();
  });
});
