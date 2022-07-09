import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

describe("<BlogForm />", () => {
  test("updated parent state and calls onSubmit", async () => {
    const createBlog = jest.fn();
    const user = userEvent.setup();

    render(<BlogForm createBlog={createBlog} />);

    const titleInput = screen.getByPlaceholderText("title");
    const authorInput = screen.getByPlaceholderText("author");
    const urlInput = screen.getByPlaceholderText("url");
    const createButton = screen.getByText("create");

    await user.type(titleInput, "blog title");
    await user.type(authorInput, "blog author");
    await user.type(urlInput, "blog url");

    await user.click(createButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe("blog title");
    expect(createBlog.mock.calls[0][0].author).toBe("blog author");
    expect(createBlog.mock.calls[0][0].url).toBe("blog url");
  });
});
