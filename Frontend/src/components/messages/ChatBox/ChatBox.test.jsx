import { vi, describe, it, expect } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import ChatBox from "./ChatBox";
import { fetchChatMessages } from "../../../services/messageServices";

describe("ChatBox", () => {
  it("Renders the chat box", () => {
    render(<ChatBox />);

    const chatBox = screen.getByTestId("ChatBox");

    expect(chatBox).toBeInTheDocument();
  });
});
