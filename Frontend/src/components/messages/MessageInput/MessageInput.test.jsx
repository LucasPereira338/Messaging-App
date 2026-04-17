import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MessageInput from "./MessageInput";

describe("MessageInput", () => {
  it("Renders the message input", () => {
    render(<MessageInput />);

    const msgInp = screen.getByTestId("MessageInput");

    expect(msgInp).toBeInTheDocument();
  });
});
