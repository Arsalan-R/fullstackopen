import { useRef, useState } from "react";
import PropTypes from "prop-types";

import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";
import notificationContext from "../components/reducer/notificationContext";

const BlogForm = ({toggle, user }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const queryClient = useQueryClient()

  const addBlog = (content) => {
    addBlogMutation.mutate(content)
    toggle()
  }

const [notification, notificationDispatch] = useContext(notificationContext);
  const addBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const newBlogWithUser = { ...newBlog, user };
      queryClient.setQueryData(['blogs'], blogs.concat(newBlogWithUser))

      notificationDispatch({
        type: "SUCCESS",
        payload: `A new blog "${newBlog.title}" by "${user.name}" added`,
      });
      setTimeout(() => {
        notificationDispatch("HIDE");
      }, 5000);
    },
    onError : () => {
      notificationDispatch({
        type: "ERROR",
        payload: "Something went wrong when posting the blog",
      });
      setTimeout(() => {
        notificationDispatch("HIDE");
      }, 5000);
    }
  })

  const AddBlog = async (event) => {
    event.preventDefault();

    addBlog({
      title,
      author,
      url,
    });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={AddBlog}>
        <div>
          <input
            type="text"
            value={title}
            name="title"
            id="title"
            onChange={({ target }) => setTitle(target.value)}
            className="title"
            placeholder="title"
            required
          />
        </div>
        <div>
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
            className="author"
            placeholder="author"
            required
          />
        </div>
        <div>
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
            className="url"
            placeholder="url"
            required
          />
        </div>
        <div>
          <button type="submit" className="create">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
