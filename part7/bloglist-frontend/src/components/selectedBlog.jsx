import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";
import notificationContext from "../components/reducer/notificationContext";

const SelectedBlog = ({ likeBlog, username, blogs }) => {
  const navigate = useNavigate()
    const id = useParams().id
    const blog = blogs.find(blog => blog.id === id)

    const queryClient = useQueryClient();

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
        navigate('/')
      };
      const comments = blog.comments
    return (
        <div>
          <h2>{blog.title}</h2>
            <div>{blog.url}</div>
            <div>
            {blog.likes} likes {" "}
              <button id="like" onClick={() => addlike(blog)}>
                like
              </button>
            </div>
            <div>name: {blog.user ? blog.user.name : "Unkown"}</div>
            {username === blog.user.username ? (
              <button onClick={() => removeBlog(blog)}>Remove</button>
            ) : null}
            <div>
              <h2>Comments</h2>
              <ul>
              {comments.map((comment) => (
                  <li key={comment && comment}>{comment && comment}</li>) //TO DO add key
              )}</ul>
            </div>
        </div>
      );

}

export default SelectedBlog