import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserCard from "./UserCard";

const user = {
  id: "sdasdsa",
  username: "pete",
  name: "pete the meek",
  portrait: "pete.jpg",
};
const talkingWith = {
  id: "sdassdsssdsa",
  username: "peter",
  name: "peter the meeker",
  portrait: "peter.jpg",
};
const handleTalkingWith = vi.fn();
describe("UserCard", () => {
  it("should render the main container with only the mandatory prop", () => {
    render(<UserCard user={user} />);

    const container = screen.getByTestId("container");

    expect(container).toBeInTheDocument();
  });

  it("should render the main container with all optional props included", () => {
    render(
      <UserCard
        user={user}
        talkingWith={talkingWith}
        handleTalkingWith={handleTalkingWith}
      />,
    );

    const container = screen.getByTestId("container");

    expect(container).toBeInTheDocument();
  });

  it("should render the user's profile picture", () => {
    render(<UserCard user={user} />);

    const image = screen.getByRole("img");

    expect(image).toBeInTheDocument();
  });

  it("should not call the function", async () => {
    render(
      <UserCard
        user={user}
        talkingWith={talkingWith}
        handleTalkingWith={handleTalkingWith}
      />,
    );

    expect(handleTalkingWith).not.toHaveBeenCalled();
  });

  it("should call the function", async () => {
    const user = userEvent.setup();
    render(
      <UserCard
        user={user}
        talkingWith={talkingWith}
        handleTalkingWith={handleTalkingWith}
      />,
    );

    const container = screen.getByTestId("container");

    await user.click(container);

    expect(handleTalkingWith).toHaveBeenCalled();
  });
});
