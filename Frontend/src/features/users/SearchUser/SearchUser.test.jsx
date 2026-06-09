import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchUser from "./SearchUser";
import * as userFuncs from "../../../services/userServices";

vi.mock(import("../../../components/entities/EntityCard/EntityCard"), () => {
  return {
    default: vi.fn(({ entity }) => (
      <div data-testid="EntityCard">Entity: {entity.name}</div>
    )),
  };
});

const fetchUsers = vi.spyOn(userFuncs, "fetchUsers").mockImplementation(() =>
  Promise.resolve([
    {
      id: "user21",
      name: "user",
      username: "user1",
      portrait: "user.png",
      lastActive: Date.now(),
    },
  ]),
);

describe("SearchUser", () => {
  it("renders the search bar", () => {
    const handleNewUser = vi.fn();
    render(<SearchUser handleNewUser={handleNewUser} />);

    const container = screen.getByTestId("SearchUser");

    expect(container).toBeInTheDocument();
  });

  it("should update the input value", async () => {
    const handleNewUser = vi.fn();
    const user = userEvent.setup();
    render(<SearchUser handleNewUser={handleNewUser} />);

    const input = await screen.findByRole("textbox");

    await user.type(input, "test");

    expect(input.value).toBe("test");
  });

  it("should display the matching users in the search results", async () => {
    const handleNewUser = vi.fn();
    const user = userEvent.setup();
    render(<SearchUser handleNewUser={handleNewUser} />);

    const input = await screen.findByRole("textbox");

    await user.type(input, "user");

    const results = await screen.findByText("Entity: user");

    expect(input.value).toBe("user");
    expect(fetchUsers).toHaveBeenCalled();
    expect(results).toBeInTheDocument();
  });
});
