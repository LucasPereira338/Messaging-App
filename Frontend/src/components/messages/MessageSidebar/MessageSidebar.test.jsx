import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MessageSidebar from "./MessageSidebar";

describe("MessageSidebar", () => {
  it("Renders the sidebar", () => {
    render(<MessageSidebar />);

    const sidebar = screen.getByTestId("MessageSidebar");

    expect(sidebar).toBeInTheDocument();
  });
});
