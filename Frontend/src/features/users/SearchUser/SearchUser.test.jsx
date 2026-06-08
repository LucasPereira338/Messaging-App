import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SearchUser from "./SearchUser";
//import * as chatFuncs from "../../../services/userServices";

/*const users = [
  {
    id: "user21",
    name: "user",
    username: "user1",
    portrait: "user.png",
    lastActive: Date.now(),
  },
];

const fetchUsers = vi.spyOn(chatFuncs, "fetchUsers").mockImplementation(() =>
  Promise.resolve([
    {
      id: "user21",
      name: "user",
      username: "user1",
      portrait: "user.png",
    },
  ]),
);*/

const handleNewUser = vi.fn();

describe("SearchUser", () => {
  it("renders the search bar", () => {
    render(<SearchUser handleNewUser={handleNewUser} />);

    const container = screen.getByTestId("SearchUser");

    expect(container).toBeInTheDocument();
  });
});
