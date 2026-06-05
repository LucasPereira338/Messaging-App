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

const handleCurrentChat = vi.fn();

describe("EntityCard", () => {
  it("should render the warning that the entity data is loading", () => {
    render(<EntityCard entity={null} />);

    const loading = screen.getByTestId("Loading");

    expect(loading).toBeInTheDocument();
  });

  it("should render the main container with only the mandatory prop", () => {
    render(<EntityCard entity={entity} />);

    const container = screen.getByTestId("EntityCard");
    const image = screen.getByRole("img");

    expect(container).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  it("should render the main container with all optional props included", () => {
    render(
      <EntityCard
        entity={entity}
        currentChat={currentChat}
        handleCurrentChat={handleCurrentChat}
        msg={msg}
      />,
    );

    const container = screen.getByTestId("EntityCard");
    const image = screen.getByRole("img");
    const message = screen.getByText("Hey!");

    expect(container).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });

  it("should not select the entity as the current chat", async () => {
    render(
      <EntityCard
        entity={entity}
        currentChat={currentChat}
        handleCurrentChat={handleCurrentChat}
        msg={msg}
      />,
    );

    expect(handleCurrentChat).not.toHaveBeenCalled();
  });

  it("should select the entity as the current chat", async () => {
    const user = userEvent.setup();
    render(
      <EntityCard
        entity={entity}
        currentChat={currentChat}
        handleCurrentChat={handleCurrentChat}
        msg={msg}
      />,
    );

    const container = await screen.findByTestId("EntityCard");

    await user.click(container);

    expect(handleCurrentChat).toHaveBeenCalled();
  });
});
