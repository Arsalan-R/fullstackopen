import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect, useState, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";
import notificationContext from "../components/reducer/notificationContext";
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';

const SelectedBlog = ({ likeBlog, username, blogs }) => {

  const [inputValue , setInputValue] = useState('')
  const navigate = useNavigate()
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)
  const commentKey = useRef(0)

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

  const commentMutation = useMutation({
    mutationFn: blogService.addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      notificationDispatch({
        type: "SUCCESS",
        payload: "Successfully added the comment!",
      });
      setTimeout(() => {
        notificationDispatch("HIDE");
      }, 5000);
    },
    onError: () => {
      notificationDispatch({
        type: "ERROR",
        payload: "unfortunately could not add the comment",
      });
      setTimeout(() => {
        notificationDispatch("HIDE");
      }, 5000);
    }
  })

  const addComment = (event) => {
    event.preventDefault();
    const newComment = inputValue
    const comment = {
      content : newComment,
      id : blog.id
    }
    commentMutation.mutate(comment)
    setInputValue("");
  }

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
        <form onSubmit={addComment}>
          <TextField id="outlined-multiline-flexible" multiline maxRows={4} type="text" value={inputValue} onChange={({ target }) => setInputValue(target.value)} />
          <Button variant="contained" type="submit">make</Button>
        </form>
        <ul>
        {comments.map((comment) => (
          <li key={commentKey.current++}>{comment && comment}</li>)
        )}</ul>
      </div>
    </div>
  );

}

export default SelectedBlog
