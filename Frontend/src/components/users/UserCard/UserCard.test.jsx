import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import UserCard from "./UserCard";

const user = { username: "pete", name: "pete the meek", portrait: "pete.jpg" };

describe("UserCard", () => {
  it("should render the main container", () => {
    render(<UserCard user={user} />);

    const container = screen.getByTestId("container");

    expect(container).toBeInTheDocument();
  });
});
