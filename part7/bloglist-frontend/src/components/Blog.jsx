import { useState } from "react";
import PropTypes from "prop-types";

import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";
import notificationContext from "../components/reducer/notificationContext";

const Blog = ({ blog, likeBlog, username }) => {
  const queryClient = useQueryClient();
  const [buttonLable, setButtonLable] = useState("show");
  const [visible, setVisible] = useState(false);

  const changeVisibility = () => {
    setVisible(!visible);
    setButtonLable(visible ? "show" : "hide");
  };

  const hideOrShow = { display: visible ? "" : "none" };

  const addlike = (blog) => {
    likeBlog({ ...blog, likes: blog.likes + 1 });
  };

  const [notification, notificationDispatch] = useContext(notificationContext);
  const deleteMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: (deletedBlog) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      notificationDispatch({
        type: "SUCCESS",
        payload: "Successfully removed the blog!",
      });
      setTimeout(() => {
        notificationDispatch("HIDE");
      }, 5000);
    },
    onError: () => {
      notificationDispatch({
        type: "ERROR",
        payload: "You are not authorized to delete this blog",
      });
      setTimeout(() => {
        notificationDispatch("HIDE");
      }, 5000);
    },
  });

  const removeBlog = (blogObject) => {
    if (
      window.confirm(
        `Remove blog ${blogObject.title} by ${blogObject.user.name}`,
      )
    ) {
      deleteMutation.mutate(blogObject);
    }
  };

  return (
    <div className="blog">
      <div className="title">
        {blog.title} {blog.author}{" "}
        <button onClick={changeVisibility}>{buttonLable}</button>
      </div>
      <div style={hideOrShow} className="moreInfo">
        <div>url: {blog.url}</div>
        <div>
          likes: {blog.likes}{" "}
          <button id="like" onClick={() => addlike(blog)}>
            like
          </button>
        </div>
        <div>name: {blog.user ? blog.user.name : "Unkown"}</div>
        {username === blog.user.username ? (
          <button onClick={() => removeBlog(blog)}>Remove</button>
        ) : null}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default Blog;
