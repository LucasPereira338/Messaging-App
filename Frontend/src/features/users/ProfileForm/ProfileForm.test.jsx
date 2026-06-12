import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProfileForm from "./ProfileForm";
import * as userFuncs from "../../../services/userServices";

const userId = "dsadas21";

const fetchUser = vi.spyOn(userFuncs, "fetchUser").mockImplementation(() =>
  Promise.resolve({
    id: userId,
    name: "user",
    username: "user1",
    email: "user1@gmail.com",
    description: "",
    portrait: "def.png",
  }),
);

const updateUser = vi.spyOn(userFuncs, "updateUser").mockImplementation(() =>
  Promise.resolve({
    id: userId,
    name: "usertest",
    username: "user1",
    email: "user1@gmail.com",
    description: "",
    portrait: "def.png",
  }),
);

describe("ProfileForm", () => {
  it("should inform that the data is loading", async () => {
    render(<ProfileForm />);

    const loadingElement = await screen.findByText("Loading data...");

    screen.debug();

    expect(loadingElement).toBeInTheDocument();
  });

  it("should render the profile form", async () => {
    const handleProfile = vi.fn();
    render(<ProfileForm userId={userId} handleProfile={handleProfile} />);

    const container = await screen.findByTestId("ProfileFormContainer");
    const labels = await screen.findAllByRole("label");

    expect(container).toBeInTheDocument();
    expect(fetchUser).toHaveBeenCalled();
    expect(labels.length).toEqual(4);
  });

  it("should update the input value", async () => {
    const handleProfile = vi.fn();
    const user = userEvent.setup();
    render(<ProfileForm userId={userId} handleProfile={handleProfile} />);

    const input = await screen.findByTestId("nameInput");

    await user.type(input, "test");

    expect(input.value).toBe("usertest");
  });

  it("should submit the data and close the profile window", async () => {
    const handleProfile = vi.fn();
    const user = userEvent.setup();
    render(<ProfileForm userId={userId} handleProfile={handleProfile} />);

    const btn = await screen.findByRole("button");

    await user.click(btn);

    expect(updateUser).toHaveBeenCalled();
    expect(handleProfile).toHaveBeenCalled();
  });
});
