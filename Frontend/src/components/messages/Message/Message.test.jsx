import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Message from "./Message";

const message = { content: "testing" };

describe("Message", () => {
  it("Renders the message", () => {
    render(<Message message={message} />);

    const msg = screen.getByLabelText("message");

    expect(msg).toBeInTheDocument();
  });
});
