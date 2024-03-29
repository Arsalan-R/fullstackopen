import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/blogForm";
import Toggleable from "./components/Toggleable";
import Notification from "./components/notifications";
import User from "./components/User";
import NotExist from "./components/notExist";
import axios from "axios";
import SelectedUser from "./components/selectedUser";
import { Container } from '@mui/material'
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import blogService from "./services/blogs";
import loginService from "./services/login";
import { useContext } from "react";
import notificationContext from "./components/reducer/notificationContext";
import UserContext from "./components/reducer/userContext";
import SelectedBlog from "./components/selectedBlog";
import FadeMenu from "./components/menu";

const App = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient();

  const userRes = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      axios.get("http://localhost:3003/api/users").then((res) => res.data),
  });

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    retry: 1,
  });
  const [user, userDispatch] = useContext(UserContext);
  const [notification, notificationDispatch] = useContext(notificationContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogService.setToken(user.token);
      userDispatch({
        type: "LOGIN",
        payload: user,
      });
      setUsername("");
      setPassword("");
      navigate('/blogs')
      notificationDispatch({
        type: "SUCCESS",
        payload: "successfully logged in",
      });
      setTimeout(() => {
        notificationDispatch("HIDE");
      }, 5000);
    } catch {
      notificationDispatch({
        type: "ERROR",
        payload: "wrong credentials",
      });
      setTimeout(() => {
        notificationDispatch("HIDE");
      }, 5000);
    }
  };

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedInUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      userDispatch({
        type: "LOGIN",
        payload: user,
      });
      blogService.setToken(user.token);
    }
  }, []);

  const logout = () => {
    window.localStorage.removeItem("loggedInUser");
    userDispatch("LOGOUT");
    notificationDispatch({
      type: "SUCCESS",
      payload: "Logged out",
    });
    setTimeout(() => {
      notificationDispatch("HIDE");
    }, 5000);
  };

  const loginPage = () => {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            <input
              type="text"
              value={username}
              name="username"
              id="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              name="username"
              id="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <div>
            <button type="submit">log in</button>
          </div>
        </form>
      </div>
    );
  };

  const likingBlog = async (blogObject) => {
    const { user, id, ...rest } = blogObject;
    const newBlogObject = rest;
    const likedData = await blogService.update(newBlogObject, id);
    const liked = { ...likedData, user, id };
    const blogs = queryClient.getQueryData(["blogs"]);
    const newBlogs = blogs.map((blog) =>
      blog.id === blogObject.id ? (blog = liked) : blog,
    );
    queryClient.setQueryData(["blogs"], newBlogs);
    notificationDispatch({
      type: "SUCCESS",
      payload: `You liked '${likedData.title}'`,
    });
    setTimeout(() => {
      notificationDispatch("HIDE");
    }, 5000);
  };

  const blogFormRef = useRef();

  const toggle = () => {
    blogFormRef.current.changeVisibility();
  };

  const blogPage = () => {
    return (
      <div>
        {user ?
        <Toggleable
        buttonLable={"New blog"}
        HideLable={"cancel"}
        ref={blogFormRef}
      >
        <BlogForm toggle={toggle} user={user} />
      </Toggleable>
      : <p>Please log in order to make blogs!</p>
      }

        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likingBlog}
            username={user && user.username}
          />
        ))}
      </div>
    );
  };

  if (result.isLoading) {
    return <div>blogs are loading...</div>;
  }

  if (result.isError) {
    return (
      <div>
        Unfortunately the blogs are currently unavailable due to porblems in
        server
      </div>
    );
  }

  if (userRes.isLoading) {
    return <div>blogs are loading...</div>;
  }

  if (userRes.isError) {
    return (
      <div>
        Unfortunately the blogs are currently unavailable due to porblems in
        server
      </div>
    );
  }

  const users = userRes.data;

  const compareNumbers = (a, b) => {
    return a.likes - b.likes;
  };

  const sortedBlogs = result.data.sort(compareNumbers); //live update for the likes

  const blogs = sortedBlogs;

  return (
    <Container maxWidth={false}>
      <FadeMenu username={user && user.username} user={user && user.username} logout={logout} />
      <Notification />
      <h2>blogs</h2>
      <Routes>
        <Route path="/" element={<Navigate replace to={'/blogs'} />} />
        <Route path="/login" element={user ? <Navigate replace to={'/blogs'}/> : loginPage() } />
        <Route path="/blogs/:id" element={<SelectedBlog likeBlog={likingBlog} username={user && user.username} blogs={blogs}/>} />
        <Route path="/blogs" element={blogPage()} />
        <Route path="/users/:id" element={<SelectedUser users={users} />} />
        <Route path="/users" element={<User users={users} />} />
        <Route path="*" element={<NotExist />} />
      </Routes>
      </Container>
  );
};

export default App;
