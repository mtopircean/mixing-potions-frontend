import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import PostCreateForm from "../PostCreateForm";

jest.mock("axios");

/* Testing render of essential input forms */
describe("PostCreateForm", () => {
  test("renders form elements", async () => {
    render(<PostCreateForm />);

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Add a title for your post")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Write a description on what this miracle combination of products has done for you.")).toBeInTheDocument();
      expect(screen.getByText("Create Post")).toBeInTheDocument();
      expect(screen.getByText("Select by Body Systems:")).toBeInTheDocument();
      expect(screen.getByText("Add product")).toBeInTheDocument();
    });
  });
});
