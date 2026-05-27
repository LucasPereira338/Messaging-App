import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ImagePreview from "./ImagePreview";

const file = new File(["name"], "name.txt");

describe("Image Preview", () => {
  it("should render the image", () => {
    render(<ImagePreview file={file} />);

    const img = screen.getByRole("img");

    expect(img).toBeInTheDocument();
  });
});
