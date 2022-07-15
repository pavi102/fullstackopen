import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog /> ", () => {
  let container;
  const blog = {
    title: "Dummy blog",
    author: "dummy author",
    url: "dummyurl.com",
    likes: 8,
    user: {
      username: "root",
      name: "Superuser",
      id: "62c5a86404d919de189bff0e",
    },
    id: "62c7247d588032dd3a35b36c",
  };
  const likeHandler = jest.fn();

  beforeEach(() => {
    container = render(
      <Blog user={{}} deleteBlog={() => {}} likeBlog={likeHandler} blog={blog} />
    ).container;
  });

  test("renders it's content", () => {
    expect(container).toHaveTextContent(blog.title);
    expect(container).toHaveTextContent(blog.author);
    expect(container).not.toHaveTextContent(blog.url);
    expect(container).not.toHaveTextContent(blog.likes);
    expect(container).not.toHaveTextContent(blog.user.name);
    expect(container).not.toHaveTextContent(blog.id);
  });

  test("after clicking view, blog details are displayed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("View");
    await user.click(button);
    expect(container).toHaveTextContent(blog.url);
    expect(container).toHaveTextContent(blog.likes);
    expect(container).toHaveTextContent(blog.user.name);
    expect(container).not.toHaveTextContent(blog.id);
  });

  test("after clicking like twice, the like event handler is called twice", async () => {
    const user = userEvent.setup();
    const viewButton = screen.getByText("View");
    await user.click(viewButton);

    const button = screen.getByText("like");
    await user.click(button);
    await user.click(button);

    expect(likeHandler.mock.calls).toHaveLength(2);
  });
});
