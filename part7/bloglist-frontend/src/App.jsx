import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/blogForm";
import Toggleable from "./components/Toggleable";
import Notification from "./components/notifications";

import blogService from "./services/blogs";
import loginService from "./services/login";
import { useContext } from "react";
import notificationContext from "./components/reducer/notificationContext";

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [notification, notificationDispatch] = useContext(notificationContext);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => {
        const compareNumbers = (a, b) => {
          return a.likes - b.likes;
        };
        const sortedBlogs = blogs.sort(compareNumbers);
        setBlogs(sortedBlogs);
      })
      .catch((error) => console.log("refreshed before receiving data"));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");

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
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const logout = () => {
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
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

  const addBlog = async (blogObject) => {
    blogFormRef.current.changeVisibility();
    try {
      const newBlog = await blogService.create(blogObject);
      const newBlogWithUser = { ...newBlog, user };
      setBlogs(blogs.concat(newBlogWithUser));

      notificationDispatch({
        type: "SUCCESS",
        payload: `A new blog "${newBlog.title}" by "${user.name}" added`,
      });
      setTimeout(() => {
        notificationDispatch("HIDE");
      }, 5000);
    } catch {
      notificationDispatch({
        type: "ERROR",
        payload: "Something went wrong when posting the blog",
      });
      setTimeout(() => {
        notificationDispatch("HIDE");
      }, 5000);
    }
  };

  const likingBlog = async (blogObject) => {
    const { user, id, ...rest } = blogObject;
    const newBlogObject = rest;
    const likedData = await blogService.update(newBlogObject, id);
    const liked = { ...likedData, user, id };
    const newBlogs = blogs.map((blog) =>
      blog.id === blogObject.id ? (blog = liked) : blog,
    );
    notificationDispatch({
      type: "SUCCESS",
      payload: `You liked '${likedData.title}'`,
    });
    setTimeout(() => {
      notificationDispatch("HIDE");
    }, 5000);
    const compareNumbers = (a, b) => {
      return a.likes - b.likes;
    };
    const sortedBlogs = newBlogs.sort(compareNumbers); //live update for the likes
    setBlogs(sortedBlogs);
  };

  const deletingBlog = async (blogObject) => {
    if (
      window.confirm(
        `Remove blog ${blogObject.title} by ${blogObject.user.name}`,
      )
    ) {
      try {
        await blogService.deleteBlog(blogObject);
        setBlogs(blogs.filter((blog) => blog.id !== blogObject.id));

        notificationDispatch({
          type: "SUCCESS",
          payload: "Successfully removed the blog!",
        });
        setTimeout(() => {
          notificationDispatch("HIDE");
        }, 5000);
      } catch {
        notificationDispatch({
          type: "ERROR",
          payload: "You are not authorized to delete this blog",
        });
        setTimeout(() => {
          notificationDispatch("HIDE");
        }, 5000);
      }
    }
  };

  const blogFormRef = useRef();
  const blogPage = () => {
    return (
      <div>
        <h2>blogs</h2>
        <div>
          {user.username} is logged in <button onClick={logout}>Logout</button>
        </div>
        <Toggleable
          buttonLable={"New blog"}
          HideLable={"cancel"}
          ref={blogFormRef}
        >
          <BlogForm createBlog={addBlog} />
        </Toggleable>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likingBlog}
            removeBlog={deletingBlog}
            username={user.username}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <Notification />
      {user === null ? loginPage() : blogPage()}
    </div>
  );
};

export default App;
