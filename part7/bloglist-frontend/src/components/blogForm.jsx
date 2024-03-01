import { useRef, useState } from "react";
import { TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";
import notificationContext from "../components/reducer/notificationContext";
import Button from '@mui/material/Button';
const BlogForm = ({ toggle, user }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const queryClient = useQueryClient();

  const addBlog = (content) => {
    addBlogMutation.mutate(content);
    toggle();
  };

  const [notification, notificationDispatch] = useContext(notificationContext);
  const addBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      const newBlogWithUser = { ...newBlog, user };
      queryClient.setQueryData(["blogs"], blogs.concat(newBlogWithUser));

      notificationDispatch({
        type: "SUCCESS",
        payload: `A new blog "${newBlog.title}" by "${user.name}" added`,
      });
      setTimeout(() => {
        notificationDispatch("HIDE");
      }, 5000);
    },
    onError: () => {
      notificationDispatch({
        type: "ERROR",
        payload: "Something went wrong when posting the blog",
      });
      setTimeout(() => {
        notificationDispatch("HIDE");
      }, 5000);
    },
  });

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
          <TextField
            type="text"
            value={title}
            name="title"
            id="title outlined-multiline-flexible"
            multiline
            maxRows={4}
            onChange={({ target }) => setTitle(target.value)}
            className="title"
            placeholder="title"
            required
          />
        </div>
        <div>
          <TextField
            multiline
            maxRows={4}
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
          <TextField
            id="outlined-multiline-flexible"
            multiline
            maxRows={4}
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
          <Button variant="contained" type="submit" className="create">
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
