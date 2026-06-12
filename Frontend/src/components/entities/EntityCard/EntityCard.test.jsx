import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EntityCard from "./EntityCard";

const entity = {
  id: "sdasdsa",
  username: "pete",
  name: "pete the meek",
  portrait: "pete.jpg",
};
const currentChat = {
  id: "sdassdsssdsa",
  username: "peter",
  name: "peter the meeker",
  portrait: "peter.jpg",
};

const msg = { id: "dsadsa12321", content: "Hey!" };

describe("EntityCard", () => {
  it("should render the warning that the entity data is loading", () => {
    render(<EntityCard entity={null} />);

    const loading = screen.getByTestId("Loading");

    expect(loading).toBeInTheDocument();
  });

  it("should render the entity", () => {
    render(<EntityCard entity={entity} />);

    const entityCard = screen.getByTestId("EntityCard");
    const image = screen.getByRole("img");

    expect(entityCard).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  it("should render the entity's message", () => {
    const handleCurrentChat = vi.fn();
    render(
      <EntityCard
        entity={entity}
        currentChat={currentChat}
        handleClick={handleCurrentChat}
        msg={msg}
      />,
    );

    const image = screen.getByRole("img");
    const message = screen.getByText("Hey!");

    expect(image).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });

  it("should select the entity as the current chat", async () => {
    const handleCurrentChat = vi.fn();
    const user = userEvent.setup();
    render(
      <EntityCard
        entity={entity}
        currentChat={currentChat}
        handleClick={handleCurrentChat}
        msg={msg}
      />,
    );

    const entityCard = await screen.findByTestId("EntityCard");

    await user.click(entityCard);

    expect(handleCurrentChat).toHaveBeenCalled();
  });
});
