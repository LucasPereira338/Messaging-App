import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ChatBox from "./ChatBox";

describe("ChatBox", () => {
  it("Renders the chat box", () => {
    render(<ChatBox />);

    const chatBox = screen.getByTestId("ChatBox");

    expect(chatBox).toBeInTheDocument();
  });
});
