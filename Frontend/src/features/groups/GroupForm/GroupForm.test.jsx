import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import GroupForm from "./GroupForm";

vi.mock(import("../../../components/entities/EntityCard/EntityCard"), () => {
  return {
    default: vi.fn(({ entity }) => (
      <div data-testid="EntityCard">Entity: {entity.name}</div>
    )),
  };
});

describe("GroupForm", () => {
  it("renders the empty chat box message", async () => {
    render(<GroupForm />);
    const GroupForm = await screen.findByTestId("GroupForm");
    const emptyMsg = await screen.findByText(
      "Use the search bar to find new people to chat with!",
    );

    expect(fetchChatMessages).not.toHaveBeenCalled();
    expect(emptyMsg).toBeInTheDocument();
    expect(GroupForm).toBeInTheDocument();
  });
});
